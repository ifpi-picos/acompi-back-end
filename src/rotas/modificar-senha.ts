import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { existsSync } from 'fs';
import { STATUS_CODES } from 'http';
const rotas = Router();
const prisma = new PrismaClient();
const cripto = require("crypto");

rotas.get('/', async (req: Request, res: Response) => {
  const alunos = await prisma.aluno.findMany({});
  const professores = await prisma.professor.findMany({});
  const usuarios = await alunos.concat(professores)
  res.status(200).json(usuarios);
});

rotas.post('/', async(req: Request, res: Response) => {
  const {email} = req.body;
  const alunos = await prisma.aluno.findMany({});
  const professores = await prisma.professor.findMany({});
  try{
    const usuarios = await alunos.concat(professores);

    if (!usuarios)
      res.status(400).send({erro: 'Usuario não encontrado.'});

    const token = cripto.randomBytes(20).toString('hex');

  } catch (erro) {
    res.status(400).send({erro: 'Erro em alterar senha, tente novamente'});
  }
});

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

export default rotas;