<<<<<<< HEAD
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { DateTime as time } from 'luxon';
=======
// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { resolve } from 'path';
// import { type } from 'os';
>>>>>>> c84f8d005fa39de31eb2c131aeb346568e4dda5f

// //interface IRequest {
// //  data_inicio_bloqueia: Date;
// //  data_fim_bloqueia: Date
// //}

// const prisma = new PrismaClient();
// const rotas = Router();

<<<<<<< HEAD

rotas.post('/bloqueia', async (req: Request, res: Response) =>  {

  const {email_professor, id_lab, horario_inicio, horario_fim, data_inicio_bloqueia, data_fim_bloqueia, dia_semana} = req.body;
  const hora_inicio = time.fromFormat(horario_inicio, "hh:mm").toSQLTime();
  const hora_fim = time.fromFormat(horario_fim, "hh:mm").toSQLTime();
  const data_inicio = time.fromFormat(data_inicio_bloqueia, "dd-LL-yyyy").toSQLDate();
  const data_fim = time.fromFormat(data_fim_bloqueia, "dd-LL-yyyy").toSQLDate();
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
  } catch (erro) {
    res.status(400).send(erro);
  }
});
=======
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
>>>>>>> c84f8d005fa39de31eb2c131aeb346568e4dda5f

// export default rotas;