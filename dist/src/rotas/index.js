"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservas_1 = __importDefault(require("./reservas"));
const proibe_lab_1 = __importDefault(require("./proibe-lab"));
const turmas_1 = __importDefault(require("./turmas"));
// import rotasPbloqueia from './pbloqueia-laboratorio';
const rotas = (0, express_1.Router)();
rotas.get('/', (req, res) => {
    // levando usuário para a home
    res.send('https://ifpi-picos.github.io/acompi-front-end/');
});
rotas.use('/reservas', reservas_1.default);
rotas.use('/administrador', proibe_lab_1.default);
rotas.use('/turmas', turmas_1.default);
// rotas.use('/pbloqueia-laboratorio', rotasPbloqueia);
exports.default = rotas;
//# sourceMappingURL=index.js.map