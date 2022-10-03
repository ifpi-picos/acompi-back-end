import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/reservas', async (req: Request, res: Response) => {
  const reservas = await prisma.reserva.findMany({});
  res.json(reservas);
});

rotas.post('/reservar', async (req: Request, res: Response) => {
  const { email_aluno, id_turma } = req.body;
  try {
    const reserva = await prisma.reserva.create({
      data: {
        email_aluno,
        id_turma,
      },
    });
    res.json(reserva);
  } catch (erro) {
    res.status(400).send(erro);
  }
});

rotas.delete('/cancela_reserva', async (req: Request, res: Response) => {
  const { email_aluno} = req.body;
  const delete_reserva = await prisma.reserva.delete({
    where: {
      email_aluno: email_aluno,
    },
  })
  res.json(delete_reserva)
});

export default rotas;