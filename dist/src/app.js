"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const rotas_1 = __importDefault(require("./rotas"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors = require('cors');
const app = (0, express_1.default)();
app.use(cors({
    origin: '*',
    credentials: true,
    methods: 'GET, PUT, POST, OPTIONS, DELETE, PATCH',
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.listen(3000, () => console.log(`Servidor funcionando!`));
app.all('/*', (req, res, next) => {
    const publicRoutes = ['/login', '/cadastro', '/modificar-senha'];
    for (let i = 0; i < publicRoutes.length; i += 1) {
        if (req.path === publicRoutes[i]) {
            return next();
        }
    }
    (0, auth_1.default)(req, res, next);
});
app.use('/', rotas_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map