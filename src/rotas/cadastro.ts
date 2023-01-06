import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import internal from 'stream';
import jwt from "jsonwebtoken"
import { Script } from 'vm';
require('dotenv').config()
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
    const alunos = await prisma.aluno.findMany({});
    const professores = await prisma.professor.findMany({});
    const usuarios = await alunos.concat(professores)
    res.status(200).json(usuarios);
});

rotas.get('/:token', async (req: Request, res: Response) => {
    const { token } = req.params;
    const aluno = await prisma.aluno.findUnique({
        where: {
            codigo_confirmacao: token,
        },
    })
    const professor = await prisma.professor.findUnique({
        where: {
            codigo_confirmacao: token,
        },
    })
    if (aluno) {
        await prisma.aluno.update({
            where: {
                id: aluno.id
            },
            data: {
                status: true,
            },
        })
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
        })
        return res.status(200).send('<script>alert("Usuário validado"); window.location.href = "https://acompi.netlify.app/autenticacao/login.html"; </script>')
    }
    else if (professor) {
        await prisma.professor.update({
            where: {
                id: professor.id
            },
            data: {
                status: true,
            },
        })
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
        })
        return res.status(200).send('<script>alert("Usuário validado"); window.location.href = "https://acompi.netlify.app/autenticacao/login.html"; </script>')
    } else {
        return res.status(400).send('<h1>Código inválido!</h1>')
    }
})

rotas.post('/', async (req: Request, res: Response) => {
    const { nome, senha, email } = req.body;

    // Criptografando senha
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    // Gerando token de validação do email
    function geraStringAleatoria(tamanho: number) {
        let stringAleatoria = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
    const codigoValidacao = geraStringAleatoria(20);
    const token = jwt.sign({ email: email }, codigoValidacao,)

    // criando o transporter para enviar email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
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
        })
        const professor = await prisma.professor.findMany({
            where: {
                email: email,
                AND: [
                    {
                        status: true
                    },
                ],
            }
        })
        if (email.indexOf('@aluno.ifpi.edu.br') != -1 && senha.length >= 8 && senha.length <= 12 && nome != '' && nome.length >= 3 && aluno[0] == null) {
            // criando o usuario
            const user = await prisma.aluno.create({
                data: {
                    nome,
                    senha: hash,
                    email,
                    codigo_confirmacao: token,
                },
            });
            // enviando o email de confirmação
            const info = await transporter.sendMail({
                from: 'acompi <acompi110@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Validação de conta do acompi", // Subject line
                html: '<h1>Validação de email</h1> <p>Clique no link para validar sua conta no acompi.</p><a href=https://acompi-back-end-la29.onrender.com/cadastro/' + token + '> Clique aqui</a>', // html body
                text: "Clique no link para validar sua conta no acompi.\n ${confirmationCode}", // plain text body
            });
            // usuário criado
            res.status(201).json(user);


        } else if (email.indexOf('@ifpi.edu.br') != -1 && senha.length >= 8 && senha.length <= 12 && nome != '' && nome.length >= 3 && professor[0] == null) {
            // criando o usuário
            const user = await prisma.professor.create({
                data: {
                    nome,
                    senha: hash,
                    email,
                    codigo_confirmacao: token,
                },
            });
            // enviando email de confirmação
            const info = await transporter.sendMail({
                from: 'acompi <acompi110@gmail.com>', // sender address
                to: 'capic.2021118tads0149@aluno.ifpi.edu.br', // list of receivers
                subject: "Validação de conta do acompi", // Subject line
                html: '<h1>Validação de email</h1> <p>Clique no link para validar sua conta no acompi.</p><a href=https://acompi-back-end-la29.onrender.com/cadastro/' + token + '> Clique aqui</a>', // html body
                text: "Clique no link para validar sua conta no acompi.\n ${confirmationCode}", // plain text body
            });
            // usuário criado
            res.status(201).json(user);
        }
        else {
            return res.status(400).send('erro no cadastro')
        }
    } catch (erro) {
        res.status(400).send(erro);
    }
});

rotas.delete('/', async (req: Request, res: Response) => {
    const { id, email } = req.body;
    try {
        if (email.indexOf('@aluno.ifpi.edu.br') != -1) {
            const delete_aluno = await prisma.aluno.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(delete_aluno)
        }
        else if (email.indexOf('@ifpi.edu.br') != -1) {
            const delete_professor = await prisma.professor.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(delete_professor)
        }
    } catch (erro) {
        res.status(400).send(erro);
    }
})

export default rotas;