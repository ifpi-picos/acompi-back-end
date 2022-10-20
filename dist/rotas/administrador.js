"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rotas = (0, express_1.Router)();
rotas.get('/', (req, res) => {
    res.end('Turmas');
});
rotas.delete('/', (req, res) => {
    res.end('Deletou e-mail');
});
exports.default = rotas;
//# sourceMappingURL=administrador.js.map