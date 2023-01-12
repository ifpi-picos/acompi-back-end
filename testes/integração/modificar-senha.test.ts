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