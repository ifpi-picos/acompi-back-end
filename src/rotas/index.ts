import { Router, Request, Response } from 'express';
import rotasReservas from './reservas';
import rotasTurmas from './turmas';
import rotasCadastro from './cadastro';
import rotasModificarSenha from './modificar-senha';
import rotasLogin from './login';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  res.send('Servidor rodando!');
});

rotas.use('/reservas', rotasReservas);
rotas.use('/turmas', rotasTurmas);
rotas.use('/cadastro', rotasCadastro);
rotas.use('/modificar-senha', rotasModificarSenha);
rotas.use('/login', rotasLogin);

export default rotas;