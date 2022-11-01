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
    const removeBloqueia = index_1.default.criarTurma.deleteMany();
    await index_1.default.$transaction([removeBloqueia]);
});
afterAll(async () => {
    const removeBloqueia = index_1.default.criarTurma.deleteMany();
    await index_1.default.$transaction([removeBloqueia]);
    await index_1.default.$disconnect();
});
describe('Testando bloqueio de laboratório', async () => {
    const novoBloqueio = {
        email_professor: 'pro@gmail.com',
        id_lab: 6,
        horario_inicio: 0.0,
        horario_fim: 0.0,
        data_inicio_bloqueia: 0,
        data_fim_bloqueia: 0,
        dia_semana: 'Sexta',
    };
    const response = await (0, supertest_1.default)(app_1.default).post('/pbloqueia-laboratorio').send(novoBloqueio);
    expect(response.statusCode).toBe(201);
});
//# sourceMappingURL=pbloqueia-laboratorio.test.js.map