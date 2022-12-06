"use strict";
// import 'jest';
// import {describe, expect, test} from '@jest/globals';
// import { getMaxListeners } from 'process';
// import request from 'supertest';
// import app from '../../src/app';
// import prisma from '../helpers/index';
// beforeAll(async () => {
//   const removeBloqueia = prisma.turma.deleteMany();
//   await prisma.$transaction([removeBloqueia]);
// });
// afterAll(async() => {
//   const removeBloqueia = prisma.turma.deleteMany();
//   await prisma.$transaction([removeBloqueia]);
//   await prisma.$disconnect();
// });
// describe('Testando bloqueio de laboratório', async () => {
//   test('teste rota post', async () => {
//   const novoBloqueio = {
//     email_professor: 'pro@gmail.com',
//     id_lab: 6,
//     horario_inicio: "16:20",
//     horario_fim: "17:20",
//     data_inicio_bloqueia: "01-11-2022",
//     data_fim_bloqueia: "01-11-1022",
//     dia_semana: 'Sexta',
//   };
//   const response = await request(app).post('/pbloqueia-laboratorio/bloqueia').send(novoBloqueio);
//   expect(response.statusCode).toBe(201);})
// })
//# sourceMappingURL=pbloqueia-laboratorio.test.js.map