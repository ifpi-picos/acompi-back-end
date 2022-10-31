import { Router, Request, Response } from 'express';
import { json } from 'stream/consumers';
import { PrismaClient } from '@prisma/client';

interface IRequest {
  data_inicio: Date;
  data_fim: Date
}

const prisma = new PrismaClient();
const rotas = Router();

rotas.post('/laboratorio', async (req: Request, res: Response) => {
    const { /*email_adm, id_lab,*/data_inicio, data_fim } = req.body;
    try {
      const proibicao = await prisma.proibeLaboratorio.create({
        data: {
          data_inicio: data_inicio,
          data_fim: data_fim
        }as IRequest,
      });
      res.status(201).json(proibicao);
    } catch (erro) {
      res.status(400).send(erro);
    }
  });

rotas.delete('/', (req: Request, res: Response) => {
    res.end('Deletou e-mail');
});

export default rotas;
