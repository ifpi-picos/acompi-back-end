import 'jest';
import request from 'supertest';
import app from '../../src/app';
import prisma from '../helpers/index';

// testes criados por Allan Barbosa

beforeAll(async () => {
    await prisma.$connect();
    await prisma.$transaction([prisma.aluno.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
});

afterAll(async () => {
    await prisma.$transaction([prisma.aluno.deleteMany()]);
    await prisma.$transaction([prisma.professor.deleteMany()]);
    await prisma.$disconnect();
});
describe('Testando o cadastro', () => {
    test('testando o post de cadastro de aluno', async () => {
        const user = await request(app).post('/cadastro').send({
            nome: "aluno",
            senha: 'z@467VHb',
            email: 'capic.2021118tads0149@aluno.ifpi.edu.br',
        });
        expect(user.statusCode).toBe(201)
    });

    test('testando o post de cadastro de professor', async () => {
        const user = await request(app).post('/cadastro').send({
            nome: "professor",
            senha: 'z@467VHb',
            email: 'sg90g8d9g8ds0g80s8g9@ifpi.edu.br',
        });
        expect(user.statusCode).toBe(201)
    });

    test('testando o post de cadastro com tipo errado de dado', async () => {
        const response = await request(app).post('/cadastro').send({
            nome: 1,
            senha: 'z@467VHb',
            email: 'capic.2021118tads0149@aluno.ifpi.edu.br',
        });
        expect(response.statusCode).toBe(400)
    });

    test('testando o post de cadastro faltando dado', async () => {
        const response = await request(app).post('/cadastro').send({
            nome: 'rodrigo',
            senha: 'z@467VHb',
        });
        expect(response.statusCode).toBe(400)
    });

    test('testando o post de cadastro com nome vazio', async () => {
        const response = await request(app).post('/cadastro').send({
            nome: '',
            senha: 'z@467VHb',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        });
        expect(response.statusCode).toBe(400)
    });

    test('testando o post de cadastro com quantidade inválida de caracteres', async () => {
        const response = await request(app).post('/cadastro').send({
            nome: 'ab',
            senha: 'z@467VHb',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        });
        expect(response.statusCode).toBe(400)
    });

    test('testando o post de senha inválida', async () => {
        const response = await request(app).post('/cadastro').send({
            nome: 'rodrigo',
            senha: 'z@467V',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        });
        expect(response.statusCode).toBe(400)
    });

    test('testando o post de senha inválida', async () => {
        const response = await request(app).post('/cadastro').send({
            nome: 'rodrigo',
            senha: 'z@467Vfqfopqfopqwjfpiqfiqpfwfq',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        });
        expect(response.statusCode).toBe(400)
    });
});