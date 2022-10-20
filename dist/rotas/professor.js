"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rotas = (0, express_1.Router)();
rotas.get('/', (req, res) => {
    res.end('turmas');
});
rotas.post('/', (req, res) => {
    res.end('adicionou turma');
});
rotas.delete('/', (req, res) => {
    res.end('deletou');
});
exports.default = rotas;
//# sourceMappingURL=professor.js.map