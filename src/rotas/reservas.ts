import { Router, Request, Response } from 'express';
import { cria, deleta } from "../controllers/reservaController"
const rotas = Router();

// rotas criadas por Allan Barbosa
rotas.post('/', cria);
rotas.delete('/:id', deleta);

export default rotas;