import express from 'express';
import rotas from './rotas';
var cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.use('/', rotas);

export default app;