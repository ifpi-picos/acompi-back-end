"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alunos_1 = __importDefault(require("./alunos"));
// import rotasProfessor from './professor';
const administrador_1 = __importDefault(require("./administrador"));
// import rotasAutenticacao from './autenticacao';
const rotas = (0, express_1.Router)();
rotas.get('/', (req, res) => {
    // levando usuário para a home
    res.send('https://ifpi-picos.github.io/acompi-front-end/');
});
rotas.use('/aluno', alunos_1.default);
// rotas.use('/professor', rotasProfessor);
rotas.use('/administrador', administrador_1.default);
// rotas.use('/autenticacao', rotasAutenticacao);
exports.default = rotas;
//# sourceMappingURL=index.js.map