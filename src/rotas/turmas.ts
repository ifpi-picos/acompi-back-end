import { get, getTurmasIdProfessor, deleta, getReservas, getTurma, cria } from "../controllers/turmaController"
import { Router } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const rotas = Router();

// rotas feitas por Allan Barbosa

rotas.get('/', get);
rotas.get('/:id', getTurma);
rotas.get('/professor/:id', getTurmasIdProfessor);
rotas.get('/reservas/:id', getReservas);
rotas.post('/', cria);
rotas.delete('/:id', deleta);

export default rotas;
