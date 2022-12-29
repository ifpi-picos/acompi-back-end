"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const rotas = (0, express_1.Router)();
rotas.get('/:token', async (req, res) => {
    // console.log(aluno)
    // console.log(professor)
    let { token } = req.body;
    console.log(token);
    const user = await prisma.aluno.findUnique({
        where: {
            codigoConfirmacao: token,
        },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const updateUser = prisma.aluno.update({
            where: {
                codigoConfirmacao: req.body,
            },
            data: {
                status: true,
            },
        });
        res.status(200).json(updateUser);
    })
        .catch((e) => console.log("error", e));
});
exports.default = rotas;
//# sourceMappingURL=confirmacao.js.map