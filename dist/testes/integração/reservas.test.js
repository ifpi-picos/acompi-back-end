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
});
afterAll(async () => {
    const removeReservas = index_1.default.reserva.deleteMany();
    await index_1.default.$transaction([removeReservas]);
    await index_1.default.$disconnect();
});
describe('Testando reservas dos alunos', () => {
    // test('testando o post da reserva', async () => {
    //   const novaReserva = {
    //     id_aluno: 1,
    //     id_turma: 1,
    //   };
    //   const response = await request(app).post('/reservas').send(novaReserva);
    //   expect(response.statusCode).toBe(201);
    //   });
    test('testando o get das reservas', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/reservas');
        const reservas = response.body;
        expect(response.statusCode).toBe(200);
        expect(reservas.length).toBe(1);
    });
    // test('testando o delete das reservas', async () => {
    //   const novaReserva = {
    //   id_aluno: 2,
    //   id_turma: 1,
    //   };
    //   const cancelaReserva = {
    //   id_reserva: 1,
    //   };
    //   let response = await request(app).post('/reservas').send(novaReserva);
    //   response = await request(app).delete('/reservas').send(cancelaReserva);
    //   expect(response.statusCode).toBe(200);
    // });
});
//# sourceMappingURL=reservas.test.js.map