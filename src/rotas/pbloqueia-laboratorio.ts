// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { resolve } from 'path';
// import { type } from 'os';

// //interface IRequest {
// //  data_inicio_bloqueia: Date;
// //  data_fim_bloqueia: Date
// //}

// const prisma = new PrismaClient();
// const rotas = Router();

// rotas.post('/bloqueia', async (req: Request, res: Response) =>  {
//   const {email_professor, id_lab, horario_inicio, horario_fim, data_inicio_bloqueia, data_fim_bloqueia, dia_semana} = req.body;
//   try {
//     const bloqueio = await prisma.criarTurma.create({
//       data: {
//         email_professor: email_professor,
//         id_lab: id_lab,
//         horario_inicio: horario_inicio,
//         horario_fim: horario_fim,
//         // data_inicio_bloqueia: data_inicio_bloqueia,
//         // data_fim_bloqueia: data_fim_bloqueia,
//         // dia_semana: dia_semana
//       } //as IRequest,
//     });
//     res.status(201).json(bloqueio);
//   } catch (erro) {
//     res.status(400).send(erro);
//   }
// });

// export default rotas;