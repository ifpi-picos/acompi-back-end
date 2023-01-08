import { Usuario } from "../models/cadastro";

export const validaCampos = async (body: Usuario) => {
    if (body.email.indexOf('@aluno.ifpi.edu.br') != -1 && body.senha.length >= 8 && body.senha.length <= 12 && body.nome != '' && body.nome.length >= 3) {
        return true;
    }
    else if (body.email.indexOf('@ifpi.edu.br') != -1 && body.senha.length >= 8 && body.senha.length <= 12 && body.nome != '' && body.nome.length >= 3) {
        return true;
    }
    else {
        return false;
    }
};
