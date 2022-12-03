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
        if (email.indexOf('aluno.ifpi.edu.br') !== -1 && senha == confirmasenha) {
            const alunoExist = await prisma.aluno.findFirst({
                where: {
                    email: email,
                    AND: [
                        {
                            status: true
                        },
                    ],
                }
            });
            if (!alunoExist)
                throw new Error("Aluno não cadastrado");
            const aluno = await prisma.aluno.update({
                data: {
                    senha: hash,
                },
                where: {
                    id: alunoExist.id,
                }
            });
            return res.status(201).json("Deu certo");
        }
        else if (email.indexOf('coord-ads.capic@ifpi.edu.br') !== -1 && senha == confirmasenha) {
            const administradorExist = await prisma.administrador.findFirst({
                where: {
                    email: email,
                }
            });
            if (!administradorExist)
                throw new Error("Administrador não cadastrado");
            const administrador = await prisma.administrador.update({
                data: {
                    senha: hash,
                },
                where: {
                    id: administradorExist.id,
                }
            });
            return res.status(201).json("Deu Certo");
        }
        else if (email.indexOf('ifpi.edu.br') !== -1 && senha == confirmasenha) {
            const professorExist = await prisma.professor.findFirst({
                where: {
                    email: email,
                    AND: [
                        {
                            status: true
                        },
                    ],
                }
            });
            if (!professorExist)
                throw new Error("Professor não cadastrado");
            const professor = await prisma.professor.update({
                data: {
                    senha: hash,
                },
                where: {
                    id: professorExist.id,
                }
            });
            return res.status(201).json("Deu certo");
        }
        return res.status(400).json('Erro');
    }
    catch (error) {
        return res.status(400);
    }
});
exports.default = rotas;
//# sourceMappingURL=modificar-senha.js.map