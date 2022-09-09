import { Router, Request, Response } from 'express';

const rotas = Router();

rotas.get('/', (req: Request, res: Response) => {
    res.end('turmas');
});

rotas.post('/', (req: Request, res: Response) => { 
    res.end('adicionou turma');
});

rotas.delete('/', (req: Request, res: Response) => {
    res.end('deletou');
});

export default rotas;
