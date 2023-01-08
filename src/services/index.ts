import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken"
require('dotenv').config()

export const prisma = new PrismaClient();

export const criptografaSenha = async (senha: String) => {
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    return hash;
};

export const criaTransporter = async () => {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    return transporter;
};

export const geraToken = async (email: string) => {
    function geraStringAleatoria(tamanho: number) {
        let stringAleatoria = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
    const codigoValidacao = geraStringAleatoria(20);
    const token = jwt.sign({ email: email }, codigoValidacao,)

    return token;
};

export const enviaEmail = async (transporter: any, token: string, email: string) => {
    await transporter.sendMail({
        from: 'acompi <acompi110@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Validação de conta do acompi", // Subject line
        html: '<h1>Validação de email</h1> <p>Clique no link para validar sua conta no acompi.</p><a href=http://localhost:3000/cadastro/' + token + '> Clique aqui</a>', // html body
        text: "Clique no link para validar sua conta no acompi.\n <a href=http://localhost:3000/cadastro/" + token + ">Clique aqui</a>", // plain text body
    });
    return;
};

export const verificaUsuario = async (email: string) => {
    const aluno = await prisma.aluno.findFirst({
        where: {
            email: email,
            AND: [
                {
                    status: true
                },
            ],
        }
    })
    const professor = await prisma.professor.findFirst({
        where: {
            email: email,
            AND: [
                {
                    status: true
                },
            ],
        }
    })
    if (!aluno && !professor) { return null; };
    if (aluno) { return aluno; };
    if (professor) { return professor; };
};