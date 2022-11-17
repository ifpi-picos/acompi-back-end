import { Router, Request, Response } from 'express';
import rotasReservas from './reservas';
import rotasAdministrador from './proibe-lab';
import rotasTurmas from './turmas';
// import rotasPbloqueia from './pbloqueia-laboratorio';
import rotasCadastro from './cadastro';
import rotasModificarSenha from './modificar-senha';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  // levando usuário para a home
  res.send('Servidor rodando');
});

rotas.use('/reservas', rotasReservas);
rotas.use('/administrador', rotasAdministrador);
rotas.use('/turmas', rotasTurmas);
// rotas.use('/pbloqueia-laboratorio', rotasPbloqueia);
rotas.use('/cadastro', rotasCadastro);
rotas.use('/modificar-senha', rotasModificarSenha);

export default rotas;