import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

beforeAll(async () => {
  const RemoveCadastroAluno = prisma.aluno.deleteMany();
  await prisma.$transaction([RemoveCadastroAluno]);
  const RemoveCadastroProfessor = prisma.professor.deleteMany();
  await prisma.$transaction([RemoveCadastroProfessor]);
});

afterAll(async () => {
  const RemoveCadastroAluno = prisma.aluno.deleteMany();
  await prisma.$transaction([RemoveCadastroAluno]);
  const RemoveCadastroProfessor = prisma.professor.deleteMany();
  await prisma.$transaction([RemoveCadastroProfessor]);
  await prisma.$disconnect();
});


describe('Testando o cadastro', () => {
  test('testando o post de cadastro de aluno', async () => {
    const novoCadastro = {
        nome: "rodrigo",
        senha: 'z@467VHb',
        email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(201);
});

  test('testando o post de cadastro de professor', async () => {
    const novoCadastro = {
        nome: "jesiel",
        senha: 'Bz!7Pl90',
        email: 'jesielviana@ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(201);
  });

  test('testando o post de cadastro com dados repetidos', async () => {
    const novoCadastro = {
      nome: "rodrigo",
      senha: 'z@467VHb',
      email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
});

  test('testando o post de cadastro com tipo errado de dado', async () => {
    const novoCadastro = {
        nome: 1,
        senha: 'z@467VHb',
        email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
  });

  test('testando o post de cadastro faltando dado', async () => {
    const novoCadastro = {
        nome: 'rodrigo',
        senha: 'z@467VHb',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
  });

  test('testando o post de cadastro com nome vazio', async () => {
    const novoCadastro = {
        nome: '',
        senha: 'z@467VHb',
        email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
  });

  test('testando o post de cadastro com quantidade inválida de caracteres', async () => {
    const novoCadastro = {
        nome: 'ab',
        senha: 'z@467VHb',
        email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
  });

  test('testando o post de senha inválida', async () => {
    const novoCadastro = {
        nome: 'rodrigo',
        senha: 'z@467V',
        email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
  });

  test('testando o post de senha inválida', async () => {
    const novoCadastro = {
        nome: 'rodrigo',
        senha: 'z@467Vfqfopqfopqwjfpiqfiqpfwfq',
        email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
      };
      const response = await request(app).post('/cadastro').send(novoCadastro);
      expect(response.statusCode).toBe(400);
  });
});