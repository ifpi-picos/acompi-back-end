import express from 'express';
import rotas from './rotas';

const app = express();

app.use(express.json());

app.listen(3000, () => console.log(`Servidor funcionando!`));

app.use('/', rotas);

export default app;