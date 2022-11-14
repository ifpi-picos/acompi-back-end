"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const index_1 = __importDefault(require("../helpers/index"));
const a = jest.fn().mockImplementation(() => { express_1.response.status(201); });
beforeAll(async () => {
    const removeCriarTurmas = index_1.default.administrador.deleteMany();
    await index_1.default.$transaction([removeCriarTurmas]);
});
afterAll(async () => {
    const removeCriarTurmas = index_1.default.administrador.deleteMany();
    await index_1.default.$transaction([removeCriarTurmas]);
    await index_1.default.$disconnect();
});
describe('Testando tabela administrador', () => {
    test('Testando post', async () => {
        const newLab = {
            data_inicio: 10112002,
            data_fim: 22029111,
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/administrador/laboratorio').send(newLab);
        expect(response.statusCode).toBe(201);
    });
});
//# sourceMappingURL=administrador.test.js.map