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
    const removeReservas = index_1.default.reserva.deleteMany();
    await index_1.default.$transaction([removeReservas]);
    const RemoveCadastroAluno = index_1.default.aluno.deleteMany();
    await index_1.default.$transaction([RemoveCadastroAluno]);
});
afterAll(async () => {
    const removeReservas = index_1.default.reserva.deleteMany();
    await index_1.default.$transaction([removeReservas]);
    const RemoveCadastroAluno = index_1.default.aluno.deleteMany();
    await index_1.default.$transaction([RemoveCadastroAluno]);
    await index_1.default.$disconnect();
});
describe('Testando reservas dos alunos', () => {
    test('testando o post da reserva (sucesso)', async () => {
        const novoCadastro = {
            nome: "rodrigo",
            senha: 'z@467VHb',
            email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
        };
        await (0, supertest_1.default)(app_1.default).post('/cadastro').send(novoCadastro);
        const novoLogin = {
            senha: 'z@467VHb',
            email: 'capic.2021118tads0335@aluno.ifpi.edu.br',
        };
        await (0, supertest_1.default)(app_1.default).post('/login').send(novoLogin);
        const alunos = await (0, supertest_1.default)(app_1.default).get('/cadastro');
        const aluno = alunos.body[0];
        console.log(aluno.id);
        console.log(aluno);
        const novaReserva = {
            id_reserva: 1,
            id_aluno: aluno.id,
            id_turma: 1,
            computador: 'sim',
            curso: 'Informática',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/reservas').send(novaReserva);
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
//# sourceMappingURL=reservas.test.js.map