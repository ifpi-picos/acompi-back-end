import { Router, Request, Response } from 'express';
import { Administrador, Aluno, PrismaClient, Professor } from '@prisma/client';
import bcrypt from 'bcryptjs' ;
import { isDataView } from 'util/types';
const nodemailer = require('nodemailer');
const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
  const alunos = await prisma.aluno.findMany({});
  const professores = await prisma.professor.findMany({});
  const usuarios = await alunos.concat(professores)
  res.status(200).json(usuarios);
});

rotas.get('/:usuario', async(req: Request, res: Response) => {
  const body  = await req.params
  const dados = await body.usuario
  const dadosSeparados = await dados.split(";")
  const email = await dadosSeparados[0]
  const senha = await dadosSeparados[1]
  const confirmasenha = await dadosSeparados[2]
  console.log('email:'+email)
  console.log('senha:'+senha)
  console.log('confirmaSenha:'+confirmasenha)
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  try{
    let alunoExist;
    let administradorExist;
    let professorExist;
    if (email.indexOf('aluno.ifpi.edu.br')!= -1) {
      alunoExist = await prisma.aluno.findFirst({
        where: {
          email: email,
          AND: [
            {
              status: true
            },
          ],
        }
      });
      const aluno = await prisma.aluno.update({
        data: {
          senha: hash,
        },
        where: {
          id: alunoExist?.id,
        }
      });
      return res.status(200).send('<script>alert("Senha alterada!"); window.location.href = "https://acompi.netlify.app/autenticacao/login.html"; </script>')
    }

    if(email.indexOf('coord-ads.capic@ifpi.edu.br') != -1) {
      administradorExist = await prisma.administrador.findFirst({
        where: {
          email: email,
        }
      });
      const administrador = await prisma.administrador.update({
        data: {
          senha: hash,
        },
        where: {
          id: administradorExist?.id,
        }
      });
      return res.status(200).send('<script>alert("Senha alterada!"); window.location.href = "https://acompi.netlify.app/autenticacao/login.html"; </script>')
    }

    if(email.indexOf('ifpi.edu.br') != -1) {
      professorExist = await prisma.professor.findFirst({
        where: {
          email: email,
          AND: [
            {
              status: true
            },
          ],
        }
      });
      const professor = await prisma.professor.update({
        data: {
          senha: hash,
        },
        where: {
          id: professorExist?.id,
        }
      });
      return res.status(200).send('<script>alert("Senha alterada!"); window.location.href = "https://acompi.netlify.app/autenticacao/login.html"; </script>')
    }
    }catch(error) {
      return res.status(400)
    }
});

rotas.patch('/', async(req: Request, res: Response) => {
  const {email, senha, confirmasenha} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);
  const usuario  = email+';'+senha+';'+confirmasenha;

  const transporder = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'acompi110@gmail.com',
      pass: 'uyflebvcolrjwofo',
    },
  });

  try{
    if (email.indexOf('aluno.ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const alunoExist = await prisma.aluno.findFirst({
        where: {
          email: email,
          AND:[
            {
              status: true
            },
          ],
        }
      });
      console.log('Aluno existe.')
      if(!alunoExist) throw new Error("Aluno não cadastrado");
      const info = await transporder.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        subject: "Alteração de senha da conta",
        html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=https://acompi-back-end-la29.onrender.com/modificar-senha/' + usuario + '>.Clique Aqui.</a>',
        text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      });
      return res.status(201).json("Deu certo");

    } else if (email.indexOf('coord-ads.capic@ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const administradorExist = await prisma.administrador.findFirst({
        where: {
          email: email,
        }
      });
      if(!administradorExist) throw new Error("Administrador não cadastrado");
      const info = await transporder.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: 'capic.2021118tads0270@aluno.ifpi.edu.br',
        subject: "Alteração de senha da conta",
        html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=https://acompi-back-end-la29.onrender.com/modificar-senha/' + usuario + '>.Clique Aqui.</a>',
        text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      });
      return res.status(201).json("Deu Certo")

    } else if (email.indexOf('ifpi.edu.br') !== -1 && senha == confirmasenha) {
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
      if(!professorExist) throw new Error("Professor não cadastrado");
      const info = await transporder.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: 'capic.2021118tads0149@aluno.ifpi.edu.br',
        subject: "Alteração de senha da conta",
        html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=https://acompi-back-end-la29.onrender.com/modificar-senha/' + usuario + '>.Clique Aqui.</a>',
        text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      });
      return res.status(201).json("Deu certo")

    }
    return res.status(400).json('Erro')

  } catch(error) {
    return res.status(400)
  }
})
export default rotas;