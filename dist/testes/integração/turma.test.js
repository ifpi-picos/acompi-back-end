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
    await index_1.default.$connect();
    const RemoveTurma = index_1.default.turma.deleteMany();
    await index_1.default.$transaction([RemoveTurma]);
    const RemoveCadastroProfessor = index_1.default.professor.deleteMany();
    await index_1.default.$transaction([RemoveCadastroProfessor]);
});
afterAll(async () => {
    const RemoveTurma = index_1.default.turma.deleteMany();
    await index_1.default.$transaction([RemoveTurma]);
    const RemoveCadastroProfessor = index_1.default.professor.deleteMany();
    await index_1.default.$transaction([RemoveCadastroProfessor]);
    await index_1.default.$disconnect();
});
describe('Testando reservas dos alunos', () => {
    // criando turma
    async function criaTurma() {
        const professores = await (0, supertest_1.default)(app_1.default).get('/cadastro');
        const professor = await professores.body[0];
        const novaTurma = {
            id_professor: professor.id,
            id_lab: 4,
            data_turma: "26/03/2022",
            horario_inicio: "13:00",
            horario_fim: "14:00",
            curso: "administração",
        };
        await (0, supertest_1.default)(app_1.default).post('/turmas').send(novaTurma);
    }
    // criando professor
    async function criaProfessor() {
        const novoCadastroProfessor = {
            nome: "professor",
            senha: 'Bz!7Pl90',
            email: '@ifpi.edu.br0000000000000000000000000000000000000000000',
        };
        await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastroProfessor);
    }
    test('testando o get das turmas', async () => {
        await criaProfessor();
        await criaTurma();
        const response = await (0, supertest_1.default)(app_1.default).get('/turmas');
        expect(response.statusCode).toBe(200);
    });
    test('testando o get das turmas do professor', async () => {
        const professores = await (0, supertest_1.default)(app_1.default).get('/cadastro');
        const professor = await professores.body[0];
        const response = await (0, supertest_1.default)(app_1.default).get('/turmas/' + professor.id);
        expect(response.statusCode).toBe(200);
    });
    test('testando o delete das turmas', async () => {
        const turmas = await (0, supertest_1.default)(app_1.default).get('/turmas');
        const turma = turmas.body[0];
        const deletaTurma = {
            id: turma.id,
        };
        const response = await (0, supertest_1.default)(app_1.default).delete('/turmas').send(deletaTurma);
        expect(response.statusCode).toBe(200);
    });
});
//# sourceMappingURL=turma.test.js.map