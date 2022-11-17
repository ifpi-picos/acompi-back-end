"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('Teste de modificar senha', () => {
    test('Testando o patch de modificar senha de um  aluno', async () => {
        const novaSenha = {
            senha: "One.π.ece",
            confrimasenha: "One.π.ece",
        };
        const response = await (0, supertest_1.default)(app_1.default).patch('/modificar-senha').send(novaSenha);
        expect(response.statusCode).toBe(201);
    });
});
//# sourceMappingURL=modificar-senha.test.js.map