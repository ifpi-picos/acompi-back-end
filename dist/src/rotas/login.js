"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
const rotas = (0, express_1.Router)();
rotas.post('/', async (req, res) => {
    try {
        const { email, senha } = req.body;
        let usuario;
        if (email.indexOf('@aluno.ifpi.edu.br') != -1) {
            usuario = await prisma.aluno.findFirst({ where: { email } });
        }
        else if (email.indexOf('@ifpi.edu.br') != -1) {
            usuario = await prisma.professor.findFirst({ where: { email } });
        }
        else if (email.indexOf('coord-ads.capic@ifpi.edu.br') != -1) {
            usuario = await prisma.administrador.findFirst({ where: { email } });
        }
        if (!usuario)
            throw new Error('Dados incorretos!');
        if (!(0, bcryptjs_1.compareSync)(senha, usuario.senha))
            throw Error("Senha incorreta!");
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, 'dkfjhsflvhdfjlhdfjkghlfjgldjfljdhflh', { expiresIn: "1d" });
        console.log(usuario);
        res.cookie('token', token, { maxAge: 5000000, httpOnly: true, sameSite: 'none', secure: false });
        console.log('fjbhdfjbhdflkgkdjghfghdfjghdjhgfghguhepgijengoerhgerhogierg');
        return res.status(201).json('Login efetuado com sucesso!');
    }
    catch (error) {
        res.status(400).json(error.message);
    }
});
exports.default = rotas;
//# sourceMappingURL=login.js.map