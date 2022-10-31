import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

beforeAll(async () => {
  const removeReservas= prisma.reserva.deleteMany();
  await prisma.$transaction([removeReservas]);
});

afterAll(async () => {
  const removeReservas = prisma.reserva.deleteMany();
  await prisma.$transaction([removeReservas]);
  await prisma.$disconnect();
});


describe('Testando reservas dos alunos', () => {
  test('testando o post da reserva', async () => {
    const novaReserva = {
      id_reserva: 1,
      id_aluno: 1,
      id_turma: 1,
      computador: 'sim',
      curso: 'Informática',
      consentimento: 'true',

    };
    const response = await request(app).post('/reservas').send(novaReserva);
    expect(response.statusCode).toBe(201);
    });

    test('testando o get das reservas', async () => {
      const response = await request(app).get('/reservas');
      const reservas = response.body;
      expect(response.statusCode).toBe(200);
      expect(reservas.length).toBe(1);
    });

    test('testando o delete das reservas', async () => {
      const novaReserva = {
      id_reserva: 2,
      id_aluno: 1,
      id_turma: 1,
      computador: 'sim',
      curso: 'Informática',
      consentimento: 'true',
      };

      const cancelaReserva = {
      id_reserva: 2,
      };
      let response = await request(app).post('/reservas').send(novaReserva);
      response = await request(app).delete('/reservas').send(cancelaReserva);
      expect(response.statusCode).toBe(200);
    });
});