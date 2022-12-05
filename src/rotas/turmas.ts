import { Router, Request, Response, response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const rotas = Router();

rotas.get('/', async (req: Request, res: Response) => {
  const visualizarturmas = await prisma.turma.findMany({});
  res.status(200).json(visualizarturmas);
});

rotas.get('/:id', async (req: Request, res: Response) => {
  const professor = await prisma.professor.findMany({
    where: {
      id: +req.params.id,
    },
    include: {
      turmas: {
        where: {
          id_professor: +req.params.id,
        },
      },
    },
  })
  res.status(200).json(professor)
});


rotas.post('/', async (req: Request, res: Response) => {
  const { id_professor, id_lab, data_turma, horario_inicio, horario_fim, curso } = req.body;
  try {
    const criarTurma = await prisma.turma.create({
      data: {
        id_professor,
        id_lab,
        data_turma,
        horario_inicio,
        horario_fim,
        curso,
      },
    })
    res.status(201).json(criarTurma);
  } catch (erro) {
    res.status(400).send(erro);
  }
});

rotas.delete('/', async (req: Request, res: Response) => {
  const { id } = req.body;
  const delete_criarTurma = await prisma.turma.delete({
    where: {
      id: id,
    },
  })
  res.status(200).json(delete_criarTurma)
});

export default rotas;
