"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWT(req, res, next) {
    const token = req.cookies ? req.cookies.token : null;
    console.log(token);
    if (!token) {
        return res.status(403).send("Token não encontrado!");
    }
    else {
        const payload = jsonwebtoken_1.default.verify(token, "dkfjhsflvhdfjlhdfjkghlfjgldjfljdhflh");
        if (typeof payload != 'string') {
            req.userId = payload.id;
            next();
        }
        else {
            return res.status(500).send("Autenticação falhou!");
        }
    }
}
exports.default = verifyJWT;
//# sourceMappingURL=auth.js.map