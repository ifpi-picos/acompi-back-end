"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const rotas = (0, express_1.Router)();
// rotas.get('/', async (req: Request, res: Response) => {
//   const visualizarturmas = await prisma.criarturma.findMany({});
//   res.status(200).json(visualizarturmas);
// });
// rotas.post('/', async (req: Request, res: Response) => {
//   const { id_turma, email_professor, id_lab, data_turma, horario_inicio, horario_fim, curso } = req.body;
//   try {
//     const criarTurma = await prisma.criarturma.create({
//       data: {
//         id_turma,
//         email_professor,
//         id_lab,
//         data_turma,
//         horario_inicio,
//         horario_fim,
//         curso,
//       },
//     });
//     res.status(201).json(criarTurma);
//   } catch (erro) {
//     res.status(400).send(erro);
//   }
// });
// rotas.delete('/', async (req: Request, res: Response) => {
//   const { email_professor } = req.body;
//   const delete_criarTurma = await prisma.criarturma.delete({
//     where: {
//       email_professor: email_professor,
//     },
//   })
//   res.status(200).json(delete_criarTurma)
// });
exports.default = rotas;
//# sourceMappingURL=turmas.js.map