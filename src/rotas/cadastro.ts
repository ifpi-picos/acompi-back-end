import { get, deleta, cria, recebeToken, getByID } from "../controllers/cadastroController";
import { Router } from 'express';

const rotas = Router();

rotas.get('/', get);
rotas.get('/aluno/:id', getByID)
rotas.get('/:token', recebeToken)
rotas.post('/', cria); 
rotas.delete('/', deleta);

export default rotas;