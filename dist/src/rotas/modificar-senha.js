"use strict";
// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// const rotas = Router();
// const prisma = new PrismaClient();
// const cripto = require("crypto");
// rotas.post('/', async(req: Request, res:Response) => {
//   let {email, senha, confirmasenha} = req.body;
//   const bcrypt = require('bcryptjs');
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(senha, salt);
//   try{
//     const aluno = await prisma.aluno.create({
//       data:{
//         email,
//         senha: hash,
//         confirmasenha: hash,
//       },
//     });
//     res.status(201).json(aluno);
//   } catch(erro) {
//     res.status(400).send(erro);
//   }
// });
// export default rotas;
//# sourceMappingURL=modificar-senha.js.map