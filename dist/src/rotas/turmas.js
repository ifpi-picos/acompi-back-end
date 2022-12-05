"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const rotas = (0, express_1.Router)();
rotas.get('/', async (req, res) => {
    const visualizarturmas = await prisma.turma.findMany({});
    res.status(200).json(visualizarturmas);
});
rotas.get('/:id', async (req, res) => {
    const professor = await prisma.professor.findMany({
        where: {
            id: +req.params.id,
        },
        include: {
            turmas: {
                where: {
                    id_professor: +req.params.id,
                },
            },
        },
    });
    res.status(200).json(professor);
});
rotas.post('/', async (req, res) => {
    const { id_professor, id_lab, data_turma, horario_inicio, horario_fim, curso } = req.body;
    try {
        const criarTurma = await prisma.turma.create({
            data: {
                id_professor,
                id_lab,
                data_turma,
                horario_inicio,
                horario_fim,
                curso,
            },
        });
        res.status(201).json(criarTurma);
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
rotas.delete('/', async (req, res) => {
    const { id } = req.body;
    const delete_criarTurma = await prisma.turma.delete({
        where: {
            id: id,
        },
    });
    res.status(200).json(delete_criarTurma);
});
exports.default = rotas;
//# sourceMappingURL=turmas.js.map