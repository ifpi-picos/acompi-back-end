// import { Router, Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { existsSync } from 'fs';
// import { STATUS_CODES } from 'http';
// import { Hash } from 'crypto';
// const rotas = Router();
// const prisma = new PrismaClient();
// const cripto = require("crypto");

// rotas.get('/', async (req: Request, res: Response) => {
//   const alunos = await prisma.aluno.findMany({});
//   const professores = await prisma.professor.findMany({});
//   const usuarios = await alunos.concat(professores)
//   res.status(200).json(usuarios);
// });

// rotas.put('/', async(req: Request, res: Response) => {
//   const {email, senha, confirmasenha} = req.body;
//   const alunos = await prisma.aluno.findMany({});
//   const professores = await prisma.professor.findMany({});
//   const bcrypt = require('bcryptjs');
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(senha, salt);
//   try{
//     const usuarios = await alunos.concat(professores);
//     if (!usuarios) {
//       res.status(400).send({erro: 'Usuário não cadastrado.'})
//     } else {
//       if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
//         const aluno = await prisma.aluno.update({
//           where: {
//             senha: hash,
//           },
//         });
//         res.status(201).json(aluno);

//       } else if (email.indexOf('ifpi.edu.br') && senha == confirmasenha){
//         const professor = await prisma.professor.update({
//           where: {
//             senha: hash,
//           },
//         });
//         res.status(201).json(professor);
//       }
//       else{
//         return res.status(400).send('erro no cadastro')
//       }
//     }
// });

// export default rotas;