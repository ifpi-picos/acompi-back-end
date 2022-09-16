import { Router, Request, Response } from 'express';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/professores.html')
});

rotas.get('professores.html/saiba-mais', (req: Request, res: Response) => {
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/escolher-turma.html');
});

rotas.get('escolher-turma.html/reservar', (req: Request, res: Response) => {
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/formulario-reserva-computador.html');
});

rotas.get('escolher-turma.html/reservar/cancelar', (req: Request, res: Response) => {
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/formulario-reserva-computador.html');
});

rotas.post('escolher-turma.html/reservar/cancelar', (req: Request, res: Response) => {
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/formulario-reserva-computador.html');
});

export default rotas;