import { Router, Request, Response } from 'express';
import rotasAluno from './alunos';
import rotasProfessor from './professor';
import rotasAdministrador from './administrador';
// import rotasAutenticacao from './autenticacao';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  // levando usuário para a home
  res.send('https://ifpi-picos.github.io/acompi-front-end/');
});

rotas.use('/aluno', rotasAluno);
rotas.use('/professor', rotasProfessor);
rotas.use('/administrador', rotasAdministrador);
// rotas.use('/autenticacao', rotasAutenticacao);

export default rotas;