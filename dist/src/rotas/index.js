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
const cadastro_1 = __importDefault(require("./cadastro"));
const modificar_senha_1 = __importDefault(require("./modificar-senha"));
//import rotasModificarSenha from './modificar-senha';
const login_1 = __importDefault(require("./login"));
const rotas = (0, express_1.Router)();
rotas.get('/', (req, res) => {
    // levando usuário para a home
    res.send('Servidor rodando');
});
console.log('email');
rotas.use('/reservas', reservas_1.default);
rotas.use('/administrador', proibe_lab_1.default);
rotas.use('/turmas', turmas_1.default);
// rotas.use('/pbloqueia-laboratorio', rotasPbloqueia);
rotas.use('/cadastro', cadastro_1.default);
rotas.use('/modificar-senha', modificar_senha_1.default);
rotas.use('/login', login_1.default);
//rotas.use('/modificar-senha', rotasModificarSenha);
exports.default = rotas;
//# sourceMappingURL=index.js.map