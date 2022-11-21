import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs' ;
const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
  const alunos = await prisma.aluno.findMany({});
  const professores = await prisma.professor.findMany({});
  const usuarios = await alunos.concat(professores)
  res.status(200).json(usuarios);
});

rotas.patch('/', async(req: Request, res: Response) => {
  const {email, senha, confirmasenha} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);
  try{
    const usuario = await prisma.aluno.findUnique({where: {email}})
    if (!usuario) {
      throw new Error('Usuário não cadastrado')
    } else {
      if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
        const aluno = await prisma.aluno.update({
  data: {
    senha: hash,
  },
  where: {email}
});
        res.status(201).json(aluno);

      } else if (email.indexOf('ifpi.edu.br') && senha == confirmasenha){
        const professor = await prisma.professor.update({
  data: {
    senha: hash,
  },
  where: email
});
        res.status(201).json(professor);
      }else{
        return res.status(400).json({message: 'erro no cadastro'})
      }
    }
  }catch(erro: any) {
    res.status(400).json(erro.message);
  }
});

export default rotas;