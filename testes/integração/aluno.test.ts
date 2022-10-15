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


describe('Testando reserva de aluno', () => {
  test('testando o post da reserva', async () => {
    const novaReserva = {
      email_aluno: 'teste@email.com',
      id_turma: 1,
    };
    const response = await request(app).post('/aluno/reservar').send(novaReserva);
    expect(response.statusCode).toBe(201);
    });

    test('testando o get das reservas', async () => {
      const response = await request(app).get('/aluno/reservas');
      const reservas = response.body;
      expect(response.statusCode).toBe(200);
      expect(reservas.length).toBe(1);
    });

    test('testando o delete das reservas', async () => {
      const novaReserva = {
      email_aluno: 'teste@email.com',
      id_turma: 1,
      };

      const cancelaReserva = {
      email_aluno: 'teste@email.com',
      };
      let response = await request(app).post('/aluno/reservar').send(novaReserva);
      response = await request(app).delete('/aluno/cancela_reserva').send(cancelaReserva);
      expect(response.statusCode).toBe(200);
    });
});