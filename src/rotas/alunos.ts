import { Router, Request, Response } from 'express';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  res.json({ aluno: 'lista de alunos' });
});

rotas.post('/', (req: Request, res: Response) => {
  res.json({ aluno: 'aluno adicionado' });
});

export default rotas;