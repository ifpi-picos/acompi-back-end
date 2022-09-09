import { Router, Request, Response } from 'express';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  console.log('alunos')
});

export default rotas;