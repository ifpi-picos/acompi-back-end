import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

// tests criados por Allan Barbosa

beforeAll(async () => {
    await prisma.$connect();
    await prisma.$transaction([prisma.turma.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
});

afterAll(async () => {
    await prisma.$transaction([prisma.turma.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
    await prisma.$disconnect();
});


describe('Testando reservas dos alunos', () => {
    // criando turma
    async function criaTurma() {
        const professor = await request(app).post('/cadastro').send({
            nome: "professor",
            senha: 'Bz!7Pl90',
            email: 'capic.2021118tads0149@ifpi.edu.br',
            status: true,
        })
        await request(app).post('/turmas').send({
            id_lab: 1,
            id_professor: professor.body.id,
            curso: "administração",
            data_turma: "26/03/2023",
            horario_inicio: "13:00",
            horario_fim: "14:00",
        })
        return;
    }
    test('testando o get das turmas', async () => {
        await criaTurma();
        const response = await request(app).get('/turmas');
        expect(response.statusCode).toBe(200);
    }, 70000);

    test('testando o get das turmas do professor', async () => {
        const professor = await prisma.professor.findFirst({});
        const response = await request(app).get('/turmas/' + professor?.id.toString());
        expect(response.statusCode).toBe(200);
    });

    test('testando o get das turmas do professor com dado errado', async () => {
        const professor = await prisma.professor.findFirst({});
        const response = await request(app).get('/turmas/a');
        expect(response.statusCode).toBe(400);
    });

    test('testando o delete das turmas', async () => {
        const turma = await prisma.turma.findFirst({});
        console.log(turma)
        const response = await request(app).delete('/turmas/' + turma?.id.toString());
        expect(response.statusCode).toBe(200);
    });

    test('testando o delete das turmas com dado errado', async () => {
        const response = await request(app).delete('/turmas/a');
        expect(response.statusCode).toBe(400);
    });

});