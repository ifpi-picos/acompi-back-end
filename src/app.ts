import express, { NextFunction, Request, Response } from 'express';
import autentication from "../middleware/auth";
import rotas from './rotas';
import cookieParser from 'cookie-parser'
import path from 'path';
var cors = require('cors');

const app = express();

app.use(cors({
    origin: '*', // url do front
    credentials: true,
    methods: 'GET, PUT, POST, OPTIONS, DELETE, PATCH',
}))

// app.use(cookieParser());

app.use(express.json());

app.listen(3000, () => console.log(`Servidor funcionando!`));

// app.all('/*', (req: Request, res: Response, next: NextFunction) =>{
//     const publicRoutes = ['/login', '/cadastro','/cadastro'+req.params[0].slice(8), '/modificar-senha','/confirmacao'];
//     for (let i = 0; i < publicRoutes.length; i +=1) {
//         if (req.path === publicRoutes[i]) {
//             return next();
//         }
//     } 
//     autentication(req, res, next);
// } )


app.use('/', rotas);

export default app;