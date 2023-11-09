import express, { NextFunction, Request, Response } from 'express';
import autentication from "../middleware/auth";
import rotas from './rotas';
import cors from "cors";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND, // url do front
    credentials: true,
    methods: 'GET, PUT, POST, OPTIONS, DELETE, PATCH',
}));

app.use(cookieParser());

app.use(express.json());

// Configuração do CSP
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https://main--acompi.netlify.app"],
    }
  }));

// app.all('/*', (req: Request, res: Response, next: NextFunction) => {
//     const publicRoutes = ['/login', '/cadastro', '/cadastro' + req.params[0].slice(8), '/modificar-senha', '/confirmacao'];
//     for (let i = 0; i < publicRoutes.length; i += 1) {
//         if (req.path === publicRoutes[i]) {
//             return next();
//         }
//     };
//     autentication(req, res, next);
// })

app.use('/', rotas);

const porta = process.env.PORT || 3000;

app.listen(porta, () => console.log(`Servidor funcionando na porta ${porta}!`));

export default app;