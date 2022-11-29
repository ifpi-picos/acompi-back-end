"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const rotas = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
rotas.get('/', async (req, res) => {
    const alunos = await prisma.aluno.findMany({});
    const professores = await prisma.professor.findMany({});
    const usuarios = await alunos.concat(professores);
    res.status(200).json(usuarios);
});
rotas.patch('/', async (req, res) => {
<<<<<<< HEAD
    //   const {email, senha, confirmasenha} = req.body;
    //   const salt = bcrypt.genSaltSync(10);
    //   const hash = bcrypt.hashSync(senha, salt);
    //   try{
    //     console.log('111111111111111111111')
    //     const usuario = await prisma.aluno.findUnique({where: {email}})
    //     console.log('2222222222222222222222')
    //     if (!usuario) {
    //       console.log('3333333333333333')
    //       res.status(400).send({erro: 'Usuário não cadastrado.'})
    //     } else {
    //       if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
    //         console.log('regua')
    //         const aluno = await prisma.aluno.update({
    //   data: {
    //     senha: hash,
    //   },
    //   where: {email}
    // });
    // console.log(aluno)
    //         res.status(201).json(aluno);
    //       } else if (email.indexOf('ifpi.edu.br') && senha == confirmasenha){
    //         const professor = await prisma.professor.update({
    //   data: {
    //     senha: hash,
    //   },
    //   where: email
    // });
    //         res.status(201).json(professor);
    //       }else{
    //         return res.status(400).send('erro no cadastro')
    //       }
    //     }
    //   }catch(erro) {
    //     res.status(400).send(erro);
    //   }
=======
    const { email, senha, confirmasenha } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(senha, salt);
    try {
        const usuario = await prisma.aluno.findUnique({ where: { email } });
        if (!usuario) {
            throw new Error('Usuário não cadastrado');
        }
        else {
            if (email.indexOf('aluno.ifpi.edu.br') && senha == confirmasenha) {
                const aluno = await prisma.aluno.update({
                    data: {
                        senha: hash,
                    },
                    where: { email }
                });
                res.status(201).json(aluno);
            }
            else if (email.indexOf('ifpi.edu.br') && senha == confirmasenha) {
                const professor = await prisma.professor.update({
                    data: {
                        senha: hash,
                    },
                    where: email
                });
                res.status(201).json(professor);
            }
            else {
                return res.status(400).json({ message: 'erro no cadastro' });
            }
        }
    }
    catch (erro) {
        res.status(400).json(erro.message);
    }
>>>>>>> b519b8072ae0df4ea10cf532602a0dcb3d486569
});
exports.default = rotas;
//# sourceMappingURL=modificar-senha.js.map