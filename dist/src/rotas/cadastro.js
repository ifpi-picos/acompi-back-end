"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
rotas.get('/', async (req, res) => {
    const alunos = await prisma.aluno.findMany({});
    res.status(200).json(alunos);
});
rotas.post('/', async (req, res) => {
    const { nome, senha, email, id, estado } = req.body;
    // const DADOS_CRIPTOGRAFAR = {
    // algoritmo : "aes256",
    // segredo : "chaves",
    // tipo : "hex"
    // };
    // function criptografar(senha) {
    //     const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    //     cipher.update(senha);
    //     return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    // };
    if (email.indexOf('aluno.ifpi.edu.br') == true && senha >= 8 && senha <= 12) {
        try {
            const aluno = await prisma.aluno.create({
                data: {
                    nome,
                    email,
                    senha,
                    id,
                    estado,
                },
            });
            res.status(201).json(aluno);
        }
        catch (erro) {
            res.status(400).send(erro);
        }
    }
    else if (email.indexOf('ifpi.edu.br') == true) {
        try {
            const professor = await prisma.professor.create({
                data: {
                    nome,
                    email,
                    senha,
                    id,
                    estado,
                },
            });
            res.status(201).json(professor);
        }
        catch (erro) {
            res.status(400).send(erro);
        }
    }
});
rotas.delete('/', async (req, res) => {
    const { id, email } = req.body;
    if (email.indexOf('aluno.ifpi.edu.br') == true) {
        try {
            const delete_aluno = await prisma.aluno.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json(delete_aluno);
        }
        catch (erro) {
            res.status(400).send(erro);
        }
    }
    else if (email.indexOf('ifpi.edu.br') == true) {
        try {
            const delete_professor = await prisma.professor.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json(delete_professor);
        }
        catch (erro) {
            res.status(400).send(erro);
        }
    }
});
exports.default = rotas;
//# sourceMappingURL=cadastro.js.map