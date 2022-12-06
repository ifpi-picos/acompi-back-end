import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

beforeAll(async () => {
    await prisma.$connect();
    const RemoveTurma = prisma.turma.deleteMany();
    await prisma.$transaction([RemoveTurma]);
    const RemoveCadastroProfessor = prisma.professor.deleteMany();
    await prisma.$transaction([RemoveCadastroProfessor]);
});

afterAll(async () => {
    const RemoveTurma = prisma.turma.deleteMany();
    await prisma.$transaction([RemoveTurma]);
    const RemoveCadastroProfessor = prisma.professor.deleteMany();
    await prisma.$transaction([RemoveCadastroProfessor]);
    await prisma.$disconnect();
});


describe('Testando reservas dos alunos', () => {
    // criando turma
    async function criaTurma() {
        const professores = await request(app).get('/cadastro')
        const professor = await professores.body[0]
        const novaTurma = {
            id_professor: professor.id,
            id_lab: 4,
            data_turma: "26/03/2022",
            horario_inicio: "13:00",
            horario_fim: "14:00",
            curso: "administração",
        }
        await request(app).post('/turmas').send(novaTurma)
    }
    // criando professor
    async function criaProfessor() {
        const novoCadastroProfessor = {
            nome: "professor",
            senha: 'Bz!7Pl90',
            email: '@ifpi.edu.br0000000000000000000000000000000000000000000',
        };
        await request(app).post('/cadastro').send(novoCadastroProfessor);
    }
    test('testando o get das turmas', async () => {
        await criaProfessor()
        await criaTurma()
        const response = await request(app).get('/turmas');
        expect(response.statusCode).toBe(200);
    });

    test('testando o get das turmas do professor', async () => {
        const professores = await request(app).get('/cadastro')
        const professor = await professores.body[0]
        const response = await request(app).get('/turmas/' + professor.id);
        expect(response.statusCode).toBe(200);
    });

    test('testando o delete das turmas', async () => {
        const turmas = await request(app).get('/turmas')
        const turma = turmas.body[0]
        const deletaTurma = {
            id: turma.id,
        };
        const response = await request(app).delete('/turmas').send(deletaTurma);
        expect(response.statusCode).toBe(200);
    });
});