import express from 'express';
import rotas from './rotas'
const app = express();

app.use('/', rotas)

app.listen(3000, () =>
console.log('servidor funcionando'));
