import { Router, Request, Response } from 'express';
import rotas from './alunos';


const app = express();

app.get('', () => {
console.log('funcionou')})

export default app;