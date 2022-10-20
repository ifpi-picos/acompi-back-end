"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const rotas = (0, express_1.Router)();
rotas.post('/laboratorio', async (req, res) => {
    const { /*email_adm, id_lab,*/ data_inicio, data_fim } = req.body;
    try {
        const proibicao = await prisma.proibeLaboratorio.create({
            data: {
                data_inicio: data_inicio,
                data_fim: data_fim
            },
        });
        res.status(201).json(proibicao);
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
rotas.delete('/', (req, res) => {
    res.end('Deletou e-mail');
});
exports.default = rotas;
//# sourceMappingURL=administrador.js.map