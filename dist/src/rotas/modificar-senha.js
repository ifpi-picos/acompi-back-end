"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
rotas.get('/', async (req, res) => {
    const alunos = await prisma.aluno.findMany({});
    const professores = await prisma.professor.findMany({});
    const usuarios = await alunos.concat(professores);
    res.status(200).json(usuarios);
});
rotas.patch('/', async (req, res) => {
    const { email, senha, confirmasenha } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(senha, salt);
    try {
        const usuario = await prisma.aluno.findFirst({ where: { email } });
        console.log(usuario);
        if (!usuario) {
            throw new Error('Usuário não cadastrado');
        }
        else {
            if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
                const email2 = email;
                const aluno = await prisma.aluno.update({
                    data: {
                        senha: hash,
                    },
                    where: {
                        id: usuario.id
                    }
                });
                res.status(201).json(aluno);
            }
            else if (email.indexOf('ifpi.edu.br') && senha == confirmasenha) {
                const professor = await prisma.professor.update({
                    data: {
                        senha: hash,
                    },
                    where: email
                });
                res.status(201).json(professor);
            }
            else {
                return res.status(400).json({ message: 'erro no cadastro' });
            }
        }
    }
    catch (erro) {
        res.status(400).json(erro.message);
    }
});
exports.default = rotas;
//# sourceMappingURL=modificar-senha.js.map