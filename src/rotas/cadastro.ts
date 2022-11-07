import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
    const administradores = await prisma.administrador.findMany({});
    res.status(200).json(administradores);
});

rotas.post('/', async (req: Request, res: Response) => {
    const { nome, senha, email, id } = req.body;
    
    criptografar(senha);

    const crypto = require("crypto");
    const cipher = crypto.createCipher();

    const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
    };

    function criptografar(senha:string) {
        const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        cipher.update(senha);
        return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    };
    
        try {
            const administrador = await prisma.aluno.create({
                data: {
                    nome,
                    email,
                    senha,
                    id,
                },
            });

            res.status(201).json(administrador);
        } catch (erro) {
            res.status(400).send(erro);
        }

    // if (email.indexOf('aluno.ifpi.edu.br') == true && senha >= 8 && senha <=12) {
    //     try {
    //         const aluno = await prisma.aluno.create({
    //             data: {
    //                 nome,
    //                 email,
    //                 senha,
    //                 id,
    //                 estado,
    //             },
    //         });

    //         res.status(201).json(aluno);
    //     } catch (erro) {
    //         res.status(400).send(erro);
    //     }
    // }
    // else if (email.indexOf('ifpi.edu.br') == true) {
    //     try {
    //         const professor = await prisma.professor.create({
    //             data: {
    //                 nome,
    //                 email,
    //                 senha,
    //                 id,
    //                 estado,
    //             },
    //         });

    //         res.status(201).json(professor);
    //     } catch (erro) {
    //         res.status(400).send(erro);
    //     }
    // }
});

rotas.delete('/', async (req: Request, res: Response) => {
    const {id} = req.body;
  try{
  const delete_administrador = await prisma.administrador.delete({
    where: {
      id:id,
    },
  })
  res.status(200).json(delete_administrador)
} catch (erro) {
  res.status(400).send(erro);
}
    // if (email.indexOf('aluno.ifpi.edu.br') == true) {
    //     try {
    //         const delete_aluno = await prisma.aluno.delete({
    //             where: {
    //                 id: id,
    //             },
    //         })
    //         res.status(200).json(delete_aluno)
    //     } catch (erro) {
    //         res.status(400).send(erro);
    //     }
    // } else if (email.indexOf('ifpi.edu.br') == true) {
    //     try {
    //         const delete_professor = await prisma.professor.delete({
    //             where: {
    //                 id: id,
    //             },
    //         })
    //         res.status(200).json(delete_professor)
    //     } catch (erro) {
    //         res.status(400).send(erro);
    //     }
    // }
    });

export default rotas;