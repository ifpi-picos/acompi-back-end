import { Router, Request, Response } from 'express';
import rotasAluno from './alunos';
import rotasProfessor from './professor';
import rotasAdministrador from './administrador';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  res.send('você está no index');
});

rotas.use('/alunos', rotasAluno);
rotas.use('/professor', rotasProfessor);
rotas.use('/administrador', rotasAdministrador);

export default rotas;