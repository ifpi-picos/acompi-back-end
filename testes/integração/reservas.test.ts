import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

// tests criados por Allan Barbosa

beforeAll(async () => {
    await prisma.$connect();
    await prisma.$transaction([prisma.reserva.deleteMany()]);
    await prisma.$transaction([prisma.aluno.deleteMany()]);
    await prisma.$transaction([prisma.turma.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
});

afterAll(async () => {
    await prisma.$transaction([prisma.reserva.deleteMany()]);
    await prisma.$transaction([prisma.aluno.deleteMany()]);
    await prisma.$transaction([prisma.turma.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
    await prisma.$disconnect();
});


describe('Testando reservas dos alunos', () => {
    // criando aluno
    async function criaAluno() {
        const aluno = await request(app).post('/cadastro').send({
            nome: "aluno",
            senha: 'z@467VHb',
            email: 'capic.2021118tads0149@aluno.ifpi.edu.br',
            status: true,
        })
        return aluno.body.id;
    }
    // criando turma
    async function criaTurma() {
        const professor = await request(app).post('/cadastro').send({
            nome: "professor",
            senha: 'Bz!7Pl90',
            email: 'capic.2021118tads0149@ifpi.edu.br',
            status: true,
        })
        const turma = await request(app).post('/turmas').send({
            id_lab: 1,
            id_professor: professor.body.id,
            curso: "administração",
            data_turma: "26/03/2023",
            horario_inicio: "13:00",
            horario_fim: "14:00",
        })
        return turma.body.id;
    }

    test('testando o post da reserva (sucesso)', async () => {
        const turmaID = await criaTurma();
        const alunoID = await criaAluno();
        const response = await request(app).post('/reservas').send({
            id_aluno: alunoID,
            id_turma: turmaID,
            computador: 'sim',
            curso: 'Informática',
        });
        expect(response.statusCode).toBe(201);
    }, 7000000);

    test('testando o post da reserva com dados repetidos', async () => {
        const turma = await prisma.turma.findFirst({});
        const turmaID = turma?.id;
        const aluno = await prisma.aluno.findFirst({});
        const alunoID = aluno?.id;
        const response = await request(app).post('/reservas').send({
            id_aluno: alunoID,
            id_turma: turmaID,
            computador: 'sim',
            curso: 'Informática',
        });
        expect(response.statusCode).toBe(400);
    });

    test('testando o post da reserva (tipo errado de dado)', async () => {
        const aluno = await prisma.aluno.findFirst({});
        const alunoID = aluno?.id;
        const response = await request(app).post('/reservas').send({
            id_aluno: alunoID,
            id_turma: true,
            computador: 'sim',
            curso: 'Informática',
        });
        expect(response.statusCode).toBe(400);
    });

    test('testando o post da reserva (dado errado)', async () => {
        const aluno = await prisma.aluno.findFirst({});
        const alunoID = aluno?.id;
        const response = await request(app).post('/reservas').send({
            id_aluno: alunoID,
            id_professor: 1,
            laboratório: 'sim',
            curso: 'Informática',
        });
        expect(response.statusCode).toBe(400);
    });

    test('testando o post da reserva (faltando dado)', async () => {
        const aluno = await prisma.aluno.findFirst({});
        const alunoID = aluno?.id;
        const response = await request(app).post('/reservas').send({
            id_aluno: alunoID,
            computador: 'sim',
            curso: 'Informática',
        });
        expect(response.statusCode).toBe(400);
    });

    test('testando o delete das reservas com dado errado', async () => {
        const response = await request(app).delete('/reservas/a')
        expect(response.statusCode).toBe(400);
    });

    test('testando o delete das reservas', async () => {
        const reserva = await prisma.reserva.findFirst({});
        const response = await request(app).delete('/reservas/' + reserva?.id.toString())
        expect(response.statusCode).toBe(200);
    });
});