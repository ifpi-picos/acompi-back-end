"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const index_1 = __importDefault(require("../helpers/index"));
beforeAll(async () => {
    const RemoveCadastroAluno = index_1.default.aluno.deleteMany();
    await index_1.default.$transaction([RemoveCadastroAluno]);
    const RemoveCadastroProfessor = index_1.default.professor.deleteMany();
    await index_1.default.$transaction([RemoveCadastroProfessor]);
});
afterAll(async () => {
    const RemoveCadastroAluno = index_1.default.aluno.deleteMany();
    await index_1.default.$transaction([RemoveCadastroAluno]);
    const RemoveCadastroProfessor = index_1.default.professor.deleteMany();
    await index_1.default.$transaction([RemoveCadastroProfessor]);
    await index_1.default.$disconnect();
});
describe('Testando o cadastro', () => {
    test('testando o post de cadastro de aluno', async () => {
        const novoCadastro = {
            nome: "rodrigo",
            senha: 'z@467VHb',
            email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(201);
    });
    test('testando o post de cadastro de professor', async () => {
        const novoCadastro = {
            nome: "jesiel",
            senha: 'Bz!7Pl90',
            email: 'jesielviana@ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(201);
    });
    test('testando o post de cadastro com dados repetidos', async () => {
        const novoCadastro = {
            nome: "rodrigo",
            senha: 'z@467VHb',
            email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(400);
    });
    test('testando o post de cadastro com tipo errado de dado', async () => {
        const novoCadastro = {
            nome: 1,
            senha: 'z@467VHb',
            email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(400);
    });
    test('testando o post de cadastro faltando dado', async () => {
        const novoCadastro = {
            nome: 'rodrigo',
            senha: 'z@467VHb',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(400);
    });
    test('testando o post de cadastro com nome vazio', async () => {
        const novoCadastro = {
            nome: '',
            senha: 'z@467VHb',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(400);
    });
    test('testando o post de senha inválida', async () => {
        const novoCadastro = {
            nome: 'rodrigo',
            senha: 'z@467V',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(400);
    });
    test('testando o post de senha inválida', async () => {
        const novoCadastro = {
            nome: 'rodrigo',
            senha: 'z@467Vfqfopqfopqwjfpiqfiqpfwfq',
            email: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        expect(response.statusCode).toBe(400);
    });
});
//# sourceMappingURL=cadastro.test.js.map