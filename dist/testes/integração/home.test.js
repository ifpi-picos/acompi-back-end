"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('Test the API base path', () => {
    test('It should response the GET method', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/');
        expect(response.statusCode).toBe(200);
    });
});
//# sourceMappingURL=home.test.js.map