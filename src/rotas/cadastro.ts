import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const crypto = require("crypto");
const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
    const administrador = await prisma.administrador.findMany({});
    const alunos = await prisma.aluno.findMany({});
    const professores = prisma.professor.findMany({});
    const usuarios = Object.assign({}, alunos, professores);
    res.status(200).json(usuarios);
});

rotas.post('/', async (req: Request, res: Response) => {
    let { nome, senha, email } = req.body;
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt)
        try {
            if (email.indexOf('@aluno.ifpi.edu.br') != -1 && senha.length >= 8 && senha.length <= 12 && nome != '' && nome.length >= 3) {
                const aluno = await prisma.aluno.create({
                    data: {
                        nome,
                        senha: hash,
                        email,
                    },
                });

                res.status(201).json(aluno);
            } else if (email.indexOf('@ifpi.edu.br') != -1 && senha.length >= 8 && senha.length <= 12 && nome != '' && nome.length >= 3) {
                const professor = await prisma.professor.create({
                    data: {
                        nome,
                        senha: hash,
                        email,
                    },
                });

                res.status(201).json(professor);
            }
            else{
                return res.status(400).send('erro no cadastro') 
            }
        } catch (erro) {
            res.status(400).send(erro);
        }
});

rotas.delete('/', async (req: Request, res: Response) => {
    const { id, email } = req.body;
    try {
        if (email.indexOf('@aluno.ifpi.edu.br') != -1) {
        const delete_aluno = await prisma.aluno.delete({
            where: {
                id: id,
            },
        })
        res.status(200).json(delete_aluno)
    }
        else if (email.indexOf('@ifpi.edu.br') != -1) {
            const delete_professor = await prisma.professor.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(delete_professor)
    }} catch (erro) {
        res.status(400).send(erro);
}})

export default rotas;