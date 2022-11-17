import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyJWT(req: Request, res: Response, next: NextFunction ) {
    const token = req.cookies ? req.cookies.token: null;

    if (!token) {
      return res.status(403).send("Token não encontrado!")
    }
    else {
      const payload = jwt.verify(token, "dkfjhsflvhdfjlhdfjkghlfjgldjfljdhflh");

      if (typeof payload != 'string') {
        req.userId = payload.id;
      
        next();
      }
      else {
        return res.status(500).send("Autenticação falhou!");
      
      }
    }
}