import { error } from "console";
import { Request, Response } from "express";
import { getAll, deletaAluno, deletaProfessor, criaAluno, criaProfessor, buscaTokenAluno, buscaTokenProfessor, atualizaStatusAluno, atualizaStatusProfessor, deletaAlunosInvalidos, deletaProfessoresInvalidos } from "../repositories/cadastroRepository";
import { criptografaSenha, criaTransporter, geraToken, enviaEmail, verificaUsuario } from "../services"
import { validaCampos } from "../services/cadastroService";

export const get = async (req: Request, res: Response) => {
    try {
        const usuarios = await getAll();
        res.status(200).send(usuarios);
    } catch (e) {
        res.status(400).send(e);
    }
};

export const cria = async (req: Request, res: Response) => {
    try {
        // verifica se o usuário já foi cadastrado
        const usuarioVerificado = await verificaUsuario(req.body.email);
        if (usuarioVerificado != null) throw "Email em uso";
        // verifica se os campos obedecem as regras de negócio
        const validacao = await validaCampos(req.body)
        if (validacao == false) throw "campo inválido";
        // criptografa a senha
        req.body.senha = await criptografaSenha(req.body.senha);
        // preparando para o envio do email
        const transporter = await criaTransporter();
        const token = await geraToken(req.body.email);
        req.body.codigo_confirmacao = token;
        let usuario = null;
        // colocando usuário no banco
        if (req.body.email.indexOf('@aluno.ifpi.edu.br') != -1) {
            usuario = await criaAluno(req.body);
        }
        else if (req.body.email.indexOf('@ifpi.edu.br') != -1) {
            usuario = await criaProfessor(req.body);
        };
        // enviando o email
        await enviaEmail(transporter, token, req.body.email);
        res.status(201).send(usuario);
    } catch (e) {
        res.status(400).send(e);
    }
};

export const recebeToken = async (req: Request, res: Response) => {
    try {
        const aluno = await buscaTokenAluno(req.params.token);
        const professor = await buscaTokenProfessor(req.params.token);
        if (aluno) {
            await atualizaStatusAluno(aluno.id);
            await deletaAlunosInvalidos(aluno.email, aluno.id);
        };
        if (professor) {
            await atualizaStatusProfessor(professor.id);
            await deletaProfessoresInvalidos(professor.email, professor.id);
        };
        // redireciona o usuário
        res.status(200).send('<script>alert("Usuário validado"); window.location.href = "https://acompi.netlify.app/autenticacao/login.html"; </script>');
    } catch (e) {
        res.status(400).send('<h1>Código inválido!</h1>');
    }
};

export const deleta = async (req: Request, res: Response) => {
    try {
        if (req.body.email.indexOf('@aluno.ifpi.edu.br') != -1) {
            await deletaAluno(Number(req.body.id));
        }
        else if (req.body.email.indexOf('@ifpi.edu.br') != -1) {
            await deletaProfessor(Number(req.body.id));
        }
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
};