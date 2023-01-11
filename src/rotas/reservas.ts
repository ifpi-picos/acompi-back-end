import { Router, Request, Response } from 'express';
import { cria, deleta, contaReservas } from "../controllers/reservaController"
const rotas = Router();

// rotas criadas por Allan Barbosa
rotas.get('/:id', contaReservas);
rotas.post('/', cria);
rotas.delete('/:id', deleta);

export default rotas;