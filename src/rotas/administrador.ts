import { Router, Request, Response } from 'express';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
    res.end('Turmas');
});


rotas.delete('/', (req: Request, res: Response) => {
    res.end('Deletou e-mail');
});

export default rotas;

