"use strict";
// import { error } from 'console';
// import { response } from 'express';
// import 'jest';
// import request from 'supertest';
// import app from '../../src/app';
// import prisma from '../helpers/index';
// beforeAll(async () => {
//     await prisma.$connect();
//     const RemoveCadastroAluno = prisma.aluno.deleteMany();
//     await prisma.$transaction([RemoveCadastroAluno]);
//     const RemoveCadastroProfessor = prisma.professor.deleteMany();
//     await prisma.$transaction([RemoveCadastroProfessor]);
// });
// afterAll(async () => {
//     const RemoveCadastroAluno = prisma.aluno.deleteMany();
//     await prisma.$transaction([RemoveCadastroAluno]);
//     const RemoveCadastroProfessor = prisma.professor.deleteMany();
//     await prisma.$transaction([RemoveCadastroProfessor]);
//     await prisma.$disconnect();
// });
// describe('Testando o cadastro', () => {
//     test('testando o post de cadastro de aluno', async () => {
//         const novoCadastro = {
//             nome: "aluno",
//             senha: 'z@467VHb',
//             email: 'capic.2021118tads0149@aluno.ifpi.edu.br',
//         };
//         const user = await request(app).post('/cadastro').send(novoCadastro);
//         expect(user.statusCode).toBe(201)
//     });
//     test('testando o post de cadastro de professor', async () => {
//         const novoCadastro = {
//             nome: "professor",
//             senha: 'Bz!7Pl90',
//             email: '@ifpi.edu.br00000000000000000000000000000000000000000000',
//         };
//         const user = await request(app).post('/cadastro').send(novoCadastro);
//         expect(user.statusCode).toBe(201)
//     });
//       test('testando o post de cadastro com tipo errado de dado', async () => {
//         const novoCadastro = {
//             nome: 1,
//             senha: 'z@467VHb',
//             email: 'capic.2021118tads0149@aluno.ifpi.edu.br',
//         };
//         const response = await request(app).post('/cadastro').send(novoCadastro);
//         expect(response.statusCode).toBe(400)
//     });
//       test('testando o post de cadastro faltando dado', async () => {
//         const novoCadastro = {
//             nome: 'rodrigo',
//             senha: 'z@467VHb',
//           };
//           const response = await request(app).post('/cadastro').send(novoCadastro);
//           expect(response.statusCode).toBe(400)
//       });
//       test('testando o post de cadastro com nome vazio', async () => {
//         const novoCadastro = {
//             nome: '',
//             senha: 'z@467VHb',
//             email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
//           };
//           const response = await request(app).post('/cadastro').send(novoCadastro);
//           expect(response.statusCode).toBe(400)
//       });
//       test('testando o post de cadastro com quantidade inválida de caracteres', async () => {
//         const novoCadastro = {
//             nome: 'ab',
//             senha: 'z@467VHb',
//             email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
//           };
//           const response = await request(app).post('/cadastro').send(novoCadastro);
//           expect(response.statusCode).toBe(400)
//       });
//       test('testando o post de senha inválida', async () => {
//         const novoCadastro = {
//             nome: 'rodrigo',
//             senha: 'z@467V',
//             email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
//           };
//           const response = await request(app).post('/cadastro').send(novoCadastro);
//           expect(response.statusCode).toBe(400)
//       });
//       test('testando o post de senha inválida', async () => {
//         const novoCadastro = {
//             nome: 'rodrigo',
//             senha: 'z@467Vfqfopqfopqwjfpiqfiqpfwfq',
//             email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
//           };
//           const response = await request(app).post('/cadastro').send(novoCadastro);
//           expect(response.statusCode).toBe(400)
//       });
// });
//# sourceMappingURL=cadastro.test.js.map