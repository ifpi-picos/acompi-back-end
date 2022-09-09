import { Router, Request, Response } from 'express';
import rotasAluno from './alunos';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  res.send('você está no index');
});

rotas.use('/alunos', rotasAluno);

export default rotas;