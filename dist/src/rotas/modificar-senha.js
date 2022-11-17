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
    const salt = await bcryptjs_1.default.genSaltSync(10);
    const hash = await bcryptjs_1.default.hashSync(senha, salt);
    try {
        console.log('111111111111111111111');
        const usuario = await prisma.aluno.findUnique({ where: { email } });
        console.log('2222222222222222222222');
        if (!usuario) {
            console.log('3333333333333333');
            res.status(400).send({ erro: 'Usuário não cadastrado.' });
        }
        else {
            if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
                console.log('regua');
                const aluno = await prisma.aluno.update({
                    data: {
                        senha: hash,
                    },
                    where: { email }
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
                return res.status(400).send('erro no cadastro');
            }
        }
    }
    catch (erro) {
        res.status(400).send(erro);
    }
});
exports.default = rotas;
//# sourceMappingURL=modificar-senha.js.map