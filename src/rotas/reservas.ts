import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
  const reservas = await prisma.reserva.findMany({});
  res.status(200).json(reservas);
});

rotas.post('/', async (req: Request, res: Response) => {
  const { id_aluno, id_turma, computador, curso} = req.body;
  try {
    const reserva = await prisma.reserva.create({
      data: {
        id_aluno,
        id_turma,
        computador,
        curso,
      },
    });
    res.status(201).json(reserva);
  } catch (erro) {
    res.status(400).send(erro);
  }
});

rotas.delete('/', async (req: Request, res: Response) => {
  const {id_reserva} = req.body;
  const delete_reserva = await prisma.reserva.delete({
    where: {
      id_reserva:id_reserva,
    },
  })
  res.status(200).json(delete_reserva)
});

export default rotas;