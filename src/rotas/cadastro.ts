import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
    const alunos = await prisma.aluno.findMany({});
    res.status(200).json(alunos);
});

rotas.post('/', async (req: Request, res: Response) => {
    const { nome, senha, email, id, estado } = req.body;
    
    // const DADOS_CRIPTOGRAFAR = {
    // algoritmo : "aes256",
    // segredo : "chaves",
    // tipo : "hex"
    // };

    // function criptografar(senha) {
    //     const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    //     cipher.update(senha);
    //     return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    // };
    if (email.indexOf('aluno.ifpi.edu.br') == true && senha >= 8 && senha <=12) {
        try {
            const aluno = await prisma.aluno.create({
                data: {
                    nome,
                    email,
                    senha,
                    id,
                    estado,
                },
            });

            res.status(201).json(aluno);
        } catch (erro) {
            res.status(400).send(erro);
        }
    }
    else if (email.indexOf('ifpi.edu.br') == true) {
        try {
            const professor = await prisma.professor.create({
                data: {
                    nome,
                    email,
                    senha,
                    id,
                    estado,
                },
            });

            res.status(201).json(professor);
        } catch (erro) {
            res.status(400).send(erro);
        }
    }
});

rotas.delete('/', async (req: Request, res: Response) => {
    const { id, email } = req.body;

    if (email.indexOf('aluno.ifpi.edu.br') == true) {
        try {
            const delete_aluno = await prisma.aluno.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(delete_aluno)
        } catch (erro) {
            res.status(400).send(erro);
        }
    } else if (email.indexOf('ifpi.edu.br') == true) {
        try {
            const delete_professor = await prisma.professor.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(delete_professor)
        } catch (erro) {
            res.status(400).send(erro);
        }
    }
    });

export default rotas;