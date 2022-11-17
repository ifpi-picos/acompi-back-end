"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const cripto = require("crypto");
rotas.get('/', async (req, res) => {
    const alunos = await prisma.aluno.findMany({});
    const professores = await prisma.professor.findMany({});
    const usuarios = await alunos.concat(professores);
    res.status(200).json(usuarios);
});
rotas.patch('/', async (req, res) => {
    const { email, senha, confirmasenha } = req.body;
    const alunos = await prisma.aluno.findMany({});
    const professores = await prisma.professor.findMany({});
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    try {
        const usuarios = await alunos.concat(professores);
        if (!usuarios) {
            res.status(400).send({ erro: 'Usuário não cadastrado.' });
        }
        else {
            if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
                const aluno = await prisma.aluno.update({
                    data: {
                        senha: hash,
                    },
                    where: hash
                });
                res.status(201).json(aluno);
            }
            else if (email.indexOf('ifpi.edu.br') && senha == confirmasenha) {
                const professor = await prisma.professor.update({
                    data: {
                        senha: hash,
                    },
                    where: hash
                });
                res.status(201).json(professor);
            }
            else {
                return res.status(400).send('erro no cadastro');
            }
        }
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
exports.default = rotas;
//# sourceMappingURL=modificar-senha.js.map