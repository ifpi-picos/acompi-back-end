import { Router, Request, Response } from 'express';
import { Administrador, Aluno, PrismaClient, Professor } from '@prisma/client';
import bcrypt from 'bcryptjs' ;
import { isDataView } from 'util/types';
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
    if (email.indexOf('aluno.ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const alunoExist = await prisma.aluno.findFirst({
        where: {
          email: email,
          AND:[
            {
              status: true
            },
          ],
        }
      });
      if(!alunoExist) throw new Error("Aluno não cadastrado");
      const aluno = await prisma.aluno.update({
        data: {
          senha: hash,
        },
        where: {
          id: alunoExist.id,
        }
      });
      return res.status(201).json("Deu certo")


    } else if (email.indexOf('coord-ads.capic@ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const administradorExist = await prisma.administrador.findFirst({
        where: {
          email: email,
        }
      });
      if(!administradorExist) throw new Error("Administrador não cadastrado");
      const administrador = await prisma.administrador.update({
        data: {
          senha: hash,
        },
        where: {
          id: administradorExist.id,
        }
      });
      return res.status(201).json("Deu Certo")


    } else if (email.indexOf('ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const professorExist = await prisma.professor.findFirst({
        where: {
          email: email,
          AND: [
            {
              status: true
            },
          ],
        }
      });
      if(!professorExist) throw new Error("Professor não cadastrado");
      const professor = await prisma.professor.update({
        data: {
          senha: hash,
        },
        where: {
          id: professorExist.id,
        }
      });
      return res.status(201).json("Deu certo")
    }

    return res.status(400).json('Erro')
    
  } catch(error) {
    return res.status(400)
  }
})
export default rotas;