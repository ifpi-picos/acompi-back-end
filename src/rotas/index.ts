import { Router, Request, Response } from 'express';
import rotasReservas from './reservas';
import rotasAdministrador from './administrador';
import rotasTurmas from './turmas';
import rotasPbloqueia from './pbloqueia-laboratorio';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  // levando usuário para a home
  res.send('https://ifpi-picos.github.io/acompi-front-end/');
});

rotas.use('/reservas', rotasReservas);
rotas.use('/administrador', rotasAdministrador);
rotas.use('/turmas', rotasTurmas);
rotas.use('/pbloqueia-laboratorio', rotasPbloqueia);

export default rotas;