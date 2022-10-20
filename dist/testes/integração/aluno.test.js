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
describe('Testando reserva de aluno', () => {
    test('testando o post da reserva', async () => {
        const novaReserva = {
            email_aluno: 'teste@email.com',
            id_turma: 1,
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/aluno/reservar').send(novaReserva);
        expect(response.statusCode).toBe(201);
    });
    test('testando o get das reservas', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/aluno/reservas');
        const reservas = response.body;
        expect(response.statusCode).toBe(200);
        expect(reservas.length).toBe(1);
    });
    test('testando o delete das reservas', async () => {
        const novaReserva = {
            email_aluno: 'teste@email.com',
            id_turma: 1,
        };
        const cancelaReserva = {
            email_aluno: 'teste@email.com',
        };
        let response = await (0, supertest_1.default)(app_1.default).post('/aluno/reservar').send(novaReserva);
        response = await (0, supertest_1.default)(app_1.default).delete('/aluno/cancela_reserva').send(cancelaReserva);
        expect(response.statusCode).toBe(200);
    });
});
//# sourceMappingURL=aluno.test.js.map