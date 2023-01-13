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
  test('Testando modificação de senha do aluno', async() => {
    await request(app).post('/cadastro').send({
      nome: "aluno",
      senha: 'z@467VHb',
      email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      status: true,
  });
    const user = await request(app).patch('/modificar-senha').send({
      email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      senha: '0987654321',
      confirmasenha: '0987654321',
  });
  expect(user.status).toBe(201)
  },7000000);

  test('Verificação de erro quando aluno coloca senhas diferentes.', async() => {
    const user = await request(app).patch('/modificar-senha').send({
      email: 'capic.2021118tads7002@aluno.ifpi.edu.br',
      senha: '098ht50321',
      confirmasenha: '0987654321',
  });
  expect(user.statusCode).toBe(400)
  },7000000);

  test('Verificação de erro quando aluno coloca apenas uma senha.', async() => {
    const user = await request(app).patch('/modificar-senha').send({
      email: 'capic.2021118tads7002@aluno.ifpi.edu.br',
      senha: '0987654321',
  });
  expect(user.statusCode).toBe(400)
  },7000000);

  test('Testando modificação de senha do professor', async() => {
    await request(app).post('/cadastro').send({
      nome: "professor",
      senha: 'qwertyuiop',
      email: 'professor@ifpi.edu.br',
      status: true,
  });
    const user = await request(app).patch('/modificar-senha').send({
      email: 'professor@ifpi.edu.br',
      senha: '12345678',
      confirmasenha: '12345678',
  });
  expect(user.status).toBe(201)
  },7000000);

  test('Verificação de erro quando professor coloca senhas diferentes.', async() => {
    const user = await request(app).patch('/modificar-senha').send({
      email: 'capic.2021118tads7002@aluno.ifpi.edu.br',
      senha: '87654321',
      confirmasenha: 'oiutrewqh',
  });
  expect(user.statusCode).toBe(400)
  },7000000);

  test('Verificação de erro quando professor coloca apenas uma senha.', async() => {
    const user = await request(app).patch('/modificar-senha').send({
      email: 'capic.2021118tads7002@aluno.ifpi.edu.br',
      senha: '12345678',
  });
  expect(user.statusCode).toBe(400)
  },7000000);
});