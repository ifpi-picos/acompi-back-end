import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

describe('Teste de modificar senha', () => {
  test('Testando o patch de modificar senha de um  aluno', async() => {
    const newUser = {
      email: "capic.118tads0123@aluno.ifpi.edu.br",
      senha: "One.π.ece",
      nome: "eu"
    }
   
    const response1 = await request(app).post('/cadastro').send(newUser)
    expect(response1.statusCode).toBe(201);
    const novaSenha = {
      email: "capic.118tads0123@aluno.ifpi.edu.br",
      senha: "One..ece",
      confrimasenha: "One..ece",
    };
    const response2 = await request(app).patch('/modificar-senha').send(novaSenha);
    expect(response2.statusCode).toBe(201);
  });
});