import { get, deleta, cria, recebeToken } from "../controllers/cadastroController";
import { Router } from 'express';

const rotas = Router();

rotas.get('/', get);
rotas.get('/:token', recebeToken)
rotas.post('/', cria); 
rotas.delete('/', deleta);

export default rotas;