import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

describe('Teste de modificar senha', () => {
  test('Testando o patch de modificar senha de um  aluno', async() => {
    const novaSenha = {
      senha: "One.π.ece",
      confrimasenha: "One.π.ece",
    };
    const response = await request(app).patch('/modificar-senha').send(novaSenha);
    expect(response.statusCode).toBe(201);
  });
});