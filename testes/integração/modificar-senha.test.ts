import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

beforeAll(async () => {
    await prisma.$connect();
    await prisma.$transaction([prisma.aluno.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
});
afterAll(async () => {
    await prisma.$transaction([prisma.aluno.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
    await prisma.$disconnect();
});

describe('Testando modificação de senha.', () => {
  test('Verificando se o aluno existe', async() => {
    await request(app).post('/cadastro').send({
      nome: "aluno",
      senha: 'z@467VHb',
      email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      status: true,
  })
    const user = await request(app).patch('/modificar-senha').send({
      email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      senha: '0987654321',
      confirmasenha: '0987654321'
  });
  expect(user.status).toBe(201)
  },7000000);
  // test('Verificação de aluno não existente.', async() => {
  //   const user = await request(app).patch('/modificar-senha').send({
  //     email: 'capic.2021118tads70@aluno.ifpi.edu.br',
  //     senha: '0987654321',
  //     confirmasenha: '0987654321'
  // });
  // expect(user.statusCode).toBe(400)
  // });
});

// import 'jest';
// import request from 'supertest';
// import app from '../../src/app';
// import prisma from '../helpers/index';

// describe('Teste de modificar senha do Aluno', () => {
//   test('Testando o patch de modificar senha de um  aluno', async() => {
//     const newUser = {
//       nome: "Iago Breno",
//       email: "capic.2021118tads0270@aluno.ifpi.edu.br",
//       senha: "87654321"
//     }
//     const response1 = await request(app).post('/cadastro').send(newUser)
//     expect(response1.statusCode).toBe(201);
//     const novaSenha = {
//       email: "capic.2021118tads0270@aluno.ifpi.edu.br",
//       senha: "12345678",
//       confrimasenha: "12345678",
//     };
//     const response2 = await request(app).patch('/modificar-senha').send(novaSenha);
//     expect(response2.statusCode).toBe(201);
//   });

// describe('Teste de modificar senha do professor', () => {
//   test('Testando o patch de modificar senha de um  professor', async() => {
//     const newUser = {
//       nome: "Jesiel Viana",
//       email: "professor@ifpi.edu.br",
//       senha: "124578012"
//     }
//     const response1 = await request(app).post('/cadastro').send(newUser)
//     expect(response1.statusCode).toBe(201);
//     const novaSenha = {
//       email: "professor@ifpi.edu.br",
//       senha: "12345678",
//       confrimasenha: "12345678",
//     };
//     const response2 = await request(app).patch('/modificar-senha').send(novaSenha);
//     expect(response2.statusCode).toBe(201);
//   });
// });