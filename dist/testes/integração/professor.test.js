"use strict";
// import 'jest';
// import test, { describe } from 'node:test';
// import request from 'supertest';
// import app from '../../src/app';
// import prisma from '../helpers/index';
// beforeAll(async () => {
//   const removeCriarTurmas = prisma.criarturma.deleteMany();
//   await prisma.$transaction([removeCriarTurmas]);
// });
// afterAll(async() => {
//   const removeCriarTurmas = prisma.criarturma.deleteMany();
//   await prisma.$transaction([removeCriarTurmas]);
//   await prisma.$disconnect();
// });
// describe('Testando criar turmas do professor', () => {
//   test('Testando get de criar turma', async () => {
//     const response = await request(app).get('/professor/criarturma');
//     const criarturma = response.body;
//     expect(response.statusCode).toBe(200);
//     expect(criarturma.length).toBe(1);
//   });
//   describe('Testando post de criar turma', async() => {
//     const novaTurma = {
//       id_turma: 1,
//       email_professor: 'testeP@gmail.com',
//       id_lab: 4,
//       data_turma: 12/11/2022,
//       horario_inicio: 1340,
//       horario_fim: 1600,
//       curso: 'Análise e Desenvolvimento de Sistemas',
//     };
//     const response = await request(app).post('/professor/criarturma').send(novaTurma);
//     expect(response.statusCode).toBe(201);
//   });
//   test('Testando o cancelar turma', async() => {
//     const novaTurma = {
//       id_turma: 1,
//       email_professor: 'testeP@gmail.com',
//       id_lab: 4,
//       data_turma: 12/11/2022,
//       horario_inicio: 1340,
//       horario_fim: 1600,
//       curso: 'Análise e Desenvolvimento de Sistemas',
//     };
//     const cancelarCriarTurma = {
//       email_professor: 'testeP@gmail.com',
//     };
//     let response = await request(app).post('/professor/criarturma').send(novaTurma);
//     response = await request(app).delete('/professor/cancelar_criar_turma').send(cancelarCriarTurma);
//     expect(response.statusCode).toBe(200);
//   })
// });
//# sourceMappingURL=professor.test.js.map