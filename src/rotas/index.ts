import { Router, Request, Response } from 'express';
import rotasAluno from './alunos';
import rotasProfessor from './professor';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  res.send('você está no index');
});

rotas.use('/alunos', rotasAluno);
rotas.use('/professor', rotasProfessor);

export default rotas;