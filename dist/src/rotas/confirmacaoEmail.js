"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const rotas = (0, express_1.Router)();
rotas.get('/:token', async (req, res) => {
    // console.log(aluno)
    // console.log(professor)
    console.log(req.body);
    const aluno = await prisma.aluno.findUnique({
        where: {
            codigoConfirmacao: req.body,
        },
    });
    const professor = await prisma.professor.findUnique({
        where: {
            codigoConfirmacao: req.body,
        },
    });
    let user;
    if (!professor) {
        user = aluno;
        const response = await prisma.aluno.update({
            where: {
                email: req.body[0],
            },
            data: {
                status: true,
            },
        });
        res.status(200).json(response);
    }
    else if (!aluno) {
        user = professor;
        const response = await prisma.professor.update({
            where: {
                email: req.body[0],
            },
            data: {
                status: true,
            },
        });
        res.status(201).json(response);
    }
    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
    }
});
exports.default = rotas;
//# sourceMappingURL=confirmacaoEmail.js.map