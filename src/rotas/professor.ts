import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const rotas = Router();

rotas.get('/visualizarturmas', async (req: Request, res: Response) => {
    const visualizarturmas = await prisma.criarTurma.findMany({});
    res.status(200).json(visualizarturmas);
});

rotas.post('/criar_turma', async (req: Request, res: Response) => {
  const { id_turma, email_professor, id_lab, data_turma, horario_inicio, horario_fim, curso } = req.body;
  try{
    const criarTurma = await prisma.criarTurma.create({
      data: {
        id_turma,
        email_professor,
        id_lab,
        data_turma,
        horario_inicio,
        horario_fim,
        curso,
      },
    });
    res.status(201).json(criarTurma);
  } catch (erro){
    res.status(400).send(erro);
  }
});

rotas.delete('/cancelar', async (req: Request, res: Response) => {
  const {email_professor} = req.body;
  const delete_criarTurma = await prisma.criarTurma.delete({
      where: {
          email_professor: email_professor,
      },
  })
    res.status(200).json(delete_criarTurma)
});

export default rotas;
