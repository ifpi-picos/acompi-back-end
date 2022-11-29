"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
rotas.get('/', async (req, res) => {
    const alunos = await prisma.aluno.findMany({});
    const professores = await prisma.professor.findMany({});
    const usuarios = await alunos.concat(professores);
    res.status(200).json(usuarios);
});
rotas.get('/:token', async (req, res) => {
    const { token } = req.params;
    const aluno = await prisma.aluno.findUnique({
        where: {
            codigoConfirmacao: token,
        },
    });
    const professor = await prisma.professor.findUnique({
        where: {
            codigoConfirmacao: token,
        },
    });
    if (aluno) {
        const updateUser = await prisma.aluno.update({
            where: {
                id: aluno.id
            },
            data: {
                status: true,
            },
        });
        await prisma.aluno.deleteMany({
            where: {
                AND: [
                    {
                        email: aluno.email,
                    },
                    {
                        id: {
                            not: aluno.id,
                        }
                    },
                ],
            },
        });
        res.status(200).json(updateUser);
    }
    else if (professor) {
        const updateUser = await prisma.professor.update({
            where: {
                id: professor.id
            },
            data: {
                status: true,
            },
        });
        await prisma.professor.deleteMany({
            where: {
                AND: [
                    {
                        email: professor.email,
                    },
                    {
                        id: {
                            not: professor.id,
                        }
                    },
                ],
            },
        });
        res.status(200).json(updateUser);
    }
    else {
        return res.status(400).send('erro no código');
    }
});
rotas.post('/', async (req, res) => {
    const { nome, senha, email } = req.body;
    // Criptografando senha
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(20);
    const hash = bcrypt.hashSync(senha, salt);
    // Gerando token de validação do email
    function geraStringAleatoria(tamanho) {
        var stringAleatoria = '';
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
    const codigoValidacao = geraStringAleatoria(20);
    const token = jsonwebtoken_1.default.sign({ email: email }, codigoValidacao);
    // Enviando email de confirmação para o usuário
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'acompi110@gmail.com',
            pass: 'uyflebvcolrjwofo',
        },
    });
    let info = await transporter.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: email,
        subject: "Validação de conta do acompi",
        html: '<h1>Validação de email</h1> <p>Clique no link para validar sua conta no acompi.</p><a href=http://localhost:3000/cadastro/' + token + '> Clique aqui</a>',
        text: "Clique no link para validar sua conta no acompi.\n ${confirmationCode}", // plain text body
    });
    // Criando o usuário
    try {
        const aluno = await prisma.aluno.findMany({
            where: {
                email: email,
                AND: [
                    {
                        status: true
                    },
                ],
            }
        });
        const professor = await prisma.professor.findMany({
            where: {
                email: email,
                AND: [
                    {
                        status: true
                    },
                ],
            }
        });
        console.log(aluno);
        console.log(professor);
        console.log(req.body);
        if (email.indexOf('aluno.ifpi.edu.br') != -1 && senha.length >= 8 && senha.length <= 12 && nome != '' && nome.length >= 3 && !aluno) {
            console.log('erro no create');
            const user = await prisma.aluno.create({
                data: {
                    nome,
                    senha: hash,
                    email,
                    codigoConfirmacao: token,
                },
            });
            res.status(201).json(user);
        }
        else if (email.indexOf('ifpi.edu.br') != -1 && senha.length >= 8 && senha.length <= 12 && nome != '' && nome.length >= 3 && !professor && email.indexOf('aluno') == -1) {
            const user = await prisma.professor.create({
                data: {
                    nome,
                    senha: hash,
                    email,
                    codigoConfirmacao: token,
                },
            });
            res.status(201).json(user);
        }
        else {
            return res.status(400).send('erro no cadastro');
        }
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
rotas.delete('/', async (req, res) => {
    const { id, email } = req.body;
    try {
        if (email.indexOf('@aluno.ifpi.edu.br') != -1) {
            const delete_aluno = await prisma.aluno.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json(delete_aluno);
        }
        else if (email.indexOf('@ifpi.edu.br') != -1) {
            const delete_professor = await prisma.professor.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json(delete_professor);
        }
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
exports.default = rotas;
//# sourceMappingURL=cadastro.js.map