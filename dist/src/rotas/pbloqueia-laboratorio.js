"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const luxon_1 = require("luxon");
//interface IRequest {
//  data_inicio_bloqueia: Date;
//  data_fim_bloqueia: Date
//}
const prisma = new client_1.PrismaClient();
const rotas = (0, express_1.Router)();
rotas.post('/bloqueia', async (req, res) => {
    const { email_professor, id_lab, horario_inicio, horario_fim, data_inicio_bloqueia, data_fim_bloqueia, dia_semana } = req.body;
    const hora_inicio = luxon_1.DateTime.fromFormat(horario_inicio, "hh:mm").toSQLTime();
    const hora_fim = luxon_1.DateTime.fromFormat(horario_fim, "hh:mm").toSQLTime();
    const data_inicio = luxon_1.DateTime.fromFormat(data_inicio_bloqueia, "dd-LL-yyyy").toSQLDate();
    const data_fim = luxon_1.DateTime.fromFormat(data_fim_bloqueia, "dd-LL-yyyy").toSQLDate();
    try {
        const bloqueio = await prisma.bloqueia.create({
            data: {
                email_professor: email_professor,
                id_lab: id_lab,
                horario_inicio: hora_inicio,
                horario_fim: hora_fim,
                data_inicio_bloqueia: data_inicio,
                data_fim_bloqueia: data_fim,
                dia_semana: dia_semana
            } //as IRequest,
        });
        res.status(201).json(bloqueio);
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
exports.default = rotas;
//# sourceMappingURL=pbloqueia-laboratorio.js.map