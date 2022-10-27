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
    const removeCriarTurmas = index_1.default.criarTurma.deleteMany();
    await index_1.default.$transaction([removeCriarTurmas]);
});
afterAll(async () => {
    const removeCriarTurmas = index_1.default.criarTurma.deleteMany();
    await index_1.default.$transaction([removeCriarTurmas]);
    await index_1.default.$disconnect();
});
describe('Testando criar turmas do professor', () => {
    test('Testando get de criar turma', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/professor/criarturma');
        const criarturma = response.body;
        expect(response.statusCode).toBe(200);
        expect(criarturma.length).toBe(1);
    });
    describe('Testando post de criar turma', async () => {
        const novaTurma = {
            id_turma: 1,
            email_professor: 'testeP@gmail.com',
            id_lab: 4,
            data_turma: 12 / 11 / 2022,
            // horario_inicio: 1340,
            // horario_fim: 1600,
            curso: 'Análise e Desenvolvimento de Sistemas',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/turmas').send(novaTurma);
        expect(response.statusCode).toBe(201);
    });
    // test('Testando o cancelar turma', async() => {
    //   const novaTurma = {
    //     id_turma: 1,
    //     email_professor: 'testeP@gmail.com',
    //     id_lab: 4,
    //     data_turma: 12/11/2022,
    //     horario_inicio: 1340,
    //     horario_fim: 1600,
    //     curso: 'Análise e Desenvolvimento de Sistemas',
    //   };
    //   const cancelarCriarTurma = {
    //     email_professor: 'testeP@gmail.com',
    //   };
    //   let response = await request(app).post('/professor/criarturma').send(novaTurma);
    //   response = await request(app).delete('/professor/cancelar_criar_turma').send(cancelarCriarTurma);
    //   expect(response.statusCode).toBe(200);
    // })
});
//# sourceMappingURL=professor.test.js.map