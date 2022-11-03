import express from 'express';
import rotas from './rotas';
var cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.listen(3000, () => console.log(`Servidor funcionando!`));

app.use('/', rotas);

export default app;