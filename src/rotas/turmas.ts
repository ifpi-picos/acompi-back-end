import { get, getTurmasIdProfessor, deleta } from "../controllers/turmaController"
import { Router, Request, Response, response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const rotas = Router();

// rotas get e delete feitas por Allan Barbosa

rotas.get('/', get);
rotas.get('/:id', getTurmasIdProfessor);
rotas.delete('/:id', deleta);
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

export default rotas;
