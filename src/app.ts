import express from 'express';
import rotas from './rotas';

const app = express();

app.use(express.json());

app.use('/', rotas);

export default app;