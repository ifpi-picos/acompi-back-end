"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
rotas.get('/reservas', async (req, res) => {
    const reservas = await prisma.reserva.findMany({});
    res.status(200).json(reservas);
});
rotas.post('/reservar', async (req, res) => {
    const { email_aluno, id_turma } = req.body;
    try {
        const reserva = await prisma.reserva.create({
            data: {
                email_aluno,
                id_turma,
            },
        });
        res.status(201).json(reserva);
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
rotas.delete('/cancela_reserva', async (req, res) => {
    const { email_aluno } = req.body;
    const delete_reserva = await prisma.reserva.delete({
        where: {
            email_aluno: email_aluno,
        },
    });
    res.status(200).json(delete_reserva);
});
exports.default = rotas;
//# sourceMappingURL=alunos.js.map