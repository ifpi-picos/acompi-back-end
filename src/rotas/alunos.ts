import { Router, Request, Response } from 'express';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
  // página inicial de aluno
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/professores.html')
});

// saiba-mais = botão
rotas.get('professores.html/saiba-mais', (req: Request, res: Response) => {
  // página com os professores para o aluno selecionar
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/escolher-turma.html');
});

rotas.get('escolher-turma.html', (req: Request, res: Response) => {
  // página com as turmas para o aluno selecionar
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/formulario-reserva-computador.html');
});

// reservar = botão
rotas.get('escolher-turma.html/reservar', (req: Request, res: Response) => {
  // página com formulário para o aluno realizar a reserva
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/formulario-reserva-computador.html');
});

// cancelar = botão
rotas.get('formulario-reserva-computador.html/cancelar', (req: Request, res: Response) => {
  // página com as turmas para o aluno selecionar
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/escolher-turma.html');
});

// reservar = botão
rotas.post('formulario-reserva-computador.html/reservar', (req: Request, res: Response) => {
  // página com as reservas dos alunos
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/ver-cancelar-reservas.html');
});

// filtrar = botão
rotas.get('/filtrar', (req: Request, res: Response) => {
  // página inicial de aluno com professores filtrados
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/professores.html')
});

// filtrar = botão
rotas.get('escolher-turma.html', (req: Request, res: Response) => {
  // página com as turmas filtradas para o aluno selecionar
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/formulario-reserva-computador.html');
});

rotas.get('ver-cancelar-reservas.html', (req: Request, res: Response) => {
  // página com as reservas do aluno
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/ver-cancelar-reservas.html');
});

// filtrar = botão
rotas.get('ver-cancelar-reservas.html', (req: Request, res: Response) => {
  // página com as reservas do aluno filtradas
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/ver-cancelar-reservas.html');
});

// cancelar-reserva= botão
rotas.delete('ver-cancelar-reservas.html/cancelar-reserva', (req: Request, res: Response) => {
  // deletar reserva do aluno
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/ver-cancelar-reservas.html');
});

// cancelar-reserva= botão
rotas.delete('ver-cancelar-reservas.html/cancelar-reserva', (req: Request, res: Response) => {
  // deletar reserva do aluno
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/ver-cancelar-reservas.html');
});

rotas.get('modificar-dados-usuario.html', (req: Request, res: Response) => {
  // página de modificar nome de usuário
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/modificar-dados-usuario.html');
});

rotas.get('modificar-dados-usuario.html', (req: Request, res: Response) => {
  // página de modificar nome de usuário
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/modificar-dados-usuario.html');
});

// salvar alterações = botão
rotas.put('modificar-dados-usuario.html', (req: Request, res: Response) => {
  // modifica nome do usuário
  res.end('https://ifpi-picos.github.io/acompi-front-end/usuarios/aluno/escolher-turma.html');
});

// sair = botão
rotas.get('/sair', (req: Request, res: Response) => {
  // ir para a página home do site
  res.end('https://ifpi-picos.github.io/acompi-front-end/')
});

export default rotas;