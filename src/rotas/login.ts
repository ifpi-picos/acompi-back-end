import {compareSync} from "bcryptjs";
import jwt from "jsonwebtoken"
import {Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

const app = Router();

app.post('/', async (req: Request, res: Response) => {

    try {

const {email, senha} = req.body;
console.log(email)
console.log(senha)
const usuario = await prisma.aluno.findFirst({where: {email: email}})
console.log(usuario?.senha)

if (!usuario) throw new Error ('Dados incorretos!');

if(await !compareSync(senha, usuario.senha)) throw Error("Senha incorreta!");

const token = jwt.sign({ id: usuario.id }, 'dkfjhsflvhdfjlhdfjkghlfjgldjfljdhflh', { expiresIn: "1d" });

res.cookie('token', token, { maxAge: 5000000, httpOnly: true, sameSite: false, secure: true})

return res.status(201).json('Login efetuado com sucesso!');


}catch (error: any) {
        res.status(400).json(error.message)
}
});

export default app;