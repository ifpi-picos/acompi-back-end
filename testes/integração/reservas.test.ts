import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

beforeAll(async () => {
  const removeReservas= prisma.reserva.deleteMany();
  await prisma.$transaction([removeReservas]);
  const RemoveCadastroAluno = prisma.aluno.deleteMany();
  await prisma.$transaction([RemoveCadastroAluno]);
});

afterAll(async () => {
  const removeReservas = prisma.reserva.deleteMany();
  await prisma.$transaction([removeReservas]);
  const RemoveCadastroAluno = prisma.aluno.deleteMany();
  await prisma.$transaction([RemoveCadastroAluno]);
  await prisma.$disconnect();
});


describe('Testando reservas dos alunos', () => {
  test('testando o post da reserva (sucesso)', async () => {
    const novoCadastro = {
      nome: "rodrigo",
      senha: 'z@467VHb',
      email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
    }
    await request(app).post('/cadastro').send(novoCadastro)
    const novoLogin = {
      senha: 'z@467VHb',
      email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
    }
    await request(app).post('/login').send(novoLogin)
    const alunos = await request(app).get('/cadastro')
    const aluno = alunos.body[0]
    console.log(aluno.id)
    console.log(aluno)
    const novaReserva = {
      id_reserva: 1,
      id_aluno: aluno.id,
      id_turma: 1,
      computador: 'sim',
      curso: 'Informática',
    };
    const response = await request(app).post('/reservas').send(novaReserva);
    expect(response.statusCode).toBe(200);
    });

    // test('testando o post da reserva (sucesso)', async () => {
    //   const novaReserva = {
    //     id_reserva: 2,
    //     id_aluno: 2,
    //     id_turma: 1,
    //     computador: 'não',
    //     curso: 'administração',
    //   };
    //   const response = await request(app).post('/reservas').send(novaReserva);
    //   expect(response.statusCode).toBe(201);
    //   });
    // test('testando o post da reserva (valores repetidos)', async () => {
    //   const novaReserva = {
    //     id_reserva: 1,
    //     id_aluno: 1,
    //     id_turma: 1,
    //     computador: 'sim',
    //     curso: 'Informática',
    //   };
    //   const response = await request(app).post('/reservas').send(novaReserva);
    //   expect(response.statusCode).toBe(400);
    //   });

    //   test('testando o post da reserva (tipo errado de dado)', async () => {
    //     const novaReserva = {
    //       id_reserva: 2,
    //       id_aluno: '2',
    //       id_turma: 1,
    //       computador: 'sim',
    //       curso: 'Informática',
    //     };
    //     const response = await request(app).post('/reservas').send(novaReserva);
    //     expect(response.statusCode).toBe(400);
    //     });

    //   test('testando o post da reserva (faltando dado)', async () => {
    //     const novaReserva = {
    //       id_reserva: 1,
    //       id_aluno: 1,
    //       computador: 'sim',
    //       curso: 'Informática',
    //     };
    //     const response = await request(app).post('/reservas').send(novaReserva);
    //     expect(response.statusCode).toBe(400);
    //     });
    // test('testando o get das reservas', async () => {
    //   const response = await request(app).get('/reservas');
    //   const reservas = response.body;
    //   expect(response.statusCode).toBe(200);
    //   expect(reservas.length).toBe(1);
    // });

    // test('testando o delete das reservas', async () => {
    //   const novaReserva = {
    //   id_reserva: 2,
    //   id_aluno: 1,
    //   id_turma: 1,
    //   computador: 'sim',
    //   curso: 'Informática',
    //   consentimento: 'true',
    //   };

    //   const cancelaReserva = {
    //   id_reserva: 2,
    //   };
    //   let response = await request(app).post('/reservas').send(novaReserva);
    //   response = await request(app).delete('/reservas').send(cancelaReserva);
    //   expect(response.statusCode).toBe(200);
    // });
});