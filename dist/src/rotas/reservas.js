"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
rotas.get('/', async (req, res) => {
    const reservas = await prisma.reserva.findMany({});
    res.status(200).json(reservas);
});
rotas.post('/', async (req, res) => {
    const { id_aluno, id_turma, computador, curso } = req.body;
    try {
        const reserva = await prisma.reserva.create({
            data: {
                id_aluno,
                id_turma,
                computador,
                curso,
            },
        });
        res.status(201).json(reserva);
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
rotas.delete('/', async (req, res) => {
    const { id_aluno, id_turma } = req.body;
    const delete_reserva = await prisma.reserva.delete({
        where: {
            aluno_turma: {
                id_aluno: id_aluno,
                id_turma: id_turma
            }
        },
    });
    res.status(200).json(delete_reserva);
});
exports.default = rotas;
//# sourceMappingURL=reservas.js.map