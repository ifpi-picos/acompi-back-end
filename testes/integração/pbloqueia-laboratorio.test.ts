import 'jest';
import { getMaxListeners } from 'process';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

beforeAll(async () => {
  const removeBloqueia = prisma.bloqueia.deleteMany();
  await prisma.$transaction([removeBloqueia]);
});

afterAll(async() => {
  const removeBloqueia = prisma.bloqueia.deleteMany();
  await prisma.$transaction([removeBloqueia]);
  await prisma.$disconnect();
});

describe ('Testando bloqueio de laboratório', async() => {
  const novoBloqueio = {
    email_professor: 'pro@gmail.com',
    id_lab: 6,
    horario_inicio: 0.0,
    horario_fim: 0.0,
    data_inicio_bloqueia: 0,
    data_fim_bloqueia: 0,
    dia_semana: 'Sexta',
  };
  const response = await request(app).post('/pbloqueia-laboratorio').send(novoBloqueio);
  expect(response.statusCode).toBe(201);
})