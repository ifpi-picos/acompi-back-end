// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const rotas = Router();
// const prisma = new PrismaClient();

// rotas.post('/', async(req: Request, res:Response) => {
//   const {email, senha, senhaa} = req.body;
//   try{
//     const administrador = await prisma.administrador.create({
//       data:{
//         email,
//         senha,
//         senhaa,
//       },
//     });
//     res.status(201).json(administrador);
//   } catch(erro) {
//     res.status(400).send(erro);
//   }
// });

// export default rotas;