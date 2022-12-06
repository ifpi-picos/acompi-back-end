import { Router, Request, Response } from 'express';
import { Administrador, Aluno, PrismaClient, Professor } from '@prisma/client';
import bcrypt from 'bcryptjs' ;
import { isDataView } from 'util/types';
const nodemailer = require('nodemailer');
const rotas = Router();
const prisma = new PrismaClient();

rotas.get('/', async (req: Request, res: Response) => {
  const alunos = await prisma.aluno.findMany({});
  const professores = await prisma.professor.findMany({});
  const usuarios = await alunos.concat(professores)
  res.status(200).json(usuarios);
});

// rotas.get('/', async (req: Request, res: Response) => {

// });

// rotas.patch('/', async(req: Request, res: Response) => {
//   const {email, senha, confirmasenha} = req.body;
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(senha, salt);
//   const  = {email: email, senha: senha, confirmasenha: confirmasenha}

//   try{
//     if (email.indexOf('aluno.ifpi.edu.br') !== -1 && senha == confirmasenha) {
//       const alunoExist = await prisma.aluno.findFirst({
//         where: {
//           email: email,
//           AND:[
//             {
//               status: true
//             },
//           ],
//         }
//       });
//       if(!alunoExist) throw new Error("Aluno não cadastrado");
//       const aluno = await prisma.aluno.update({
//         data: {
//           senha: hash,
//         },
//         where: {
//           id: alunoExist.id,
//         }
//       });
//       return res.status(201).json("Deu certo")


//     } else if (email.indexOf('coord-ads.capic@ifpi.edu.br') !== -1 && senha == confirmasenha) {
//       const administradorExist = await prisma.administrador.findFirst({
//         where: {
//           email: email,
//         }
//       });
//       if(!administradorExist) throw new Error("Administrador não cadastrado");
//       const administrador = await prisma.administrador.update({
//         data: {
//           senha: hash,
//         },
//         where: {
//           id: administradorExist.id,
//         }
//       });
//       return res.status(201).json("Deu Certo")


//     } else if (email.indexOf('ifpi.edu.br') !== -1 && senha == confirmasenha) {
//       const professorExist = await prisma.professor.findFirst({
//         where: {
//           email: email,
//           AND: [
//             {
//               status: true
//             },
//           ],
//         }
//       });
//       if(!professorExist) throw new Error("Professor não cadastrado");
//       const professor = await prisma.professor.update({
//         data: {
//           senha: hash,
//         },
//         where: {
//           id: professorExist.id,
//         }
//       });
//       return res.status(201).json("Deu certo")
//     }

//     return res.status(400).json('Erro')
    
//   } catch(error) {
//     return res.status(400)
//   }
// })

//.........................................................................................
rotas.get('/:usuario', async(req: Request, res: Response) => {
  const body  = await req.params
  const dados = await body.usuario
  const dadosSeparados = await dados.split(";")
  const email = await dadosSeparados[0]
  const senha = await dadosSeparados[1]
  const confirmasenha = await dadosSeparados[2]
  console.log('email:'+email)
  console.log('senha:'+senha)
  console.log('confirmaSenha:'+confirmasenha)
})

rotas.patch('/', async(req: Request, res: Response) => {
  const {email, senha, confirmasenha} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  let transporder = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'acompi110@gmail.com',
      pass: 'uyflebvcolrjwofo',
    },
  });

  try{
    if (email.indexOf('aluno.ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const alunoExist = await prisma.aluno.findFirst({
        where: {
          email: email,
          AND:[
            {
              status: true
            },
          ],
        }
      });
      console.log('Aluno existe.')
      if(!alunoExist) throw new Error("Aluno não cadastrado");
      const usuario  = email+';'+senha+';'+confirmasenha
      let info = await transporder.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: email,
        subject: "Alteração de senha da conta",
        html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=http://localhost:3000/modificar-senha/'+usuario+'>.Clique Aqui.</a>',
        text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      }).then(
        console.log('Mensagem enviada.'),
        async () => {
          const aluno = await prisma.aluno.update({
            data: {
              senha: hash,
            },
            where: {
              id: alunoExist.id,
            }
          }).then(
            () => {
              return res.status(201).json("Email enviado")
            }
          ).catch(
            () => {
              return res.status(400).json("Usuario não encontrado")
            }
          )
        }
      ).catch(
        () => {
          return res.status(400).json("Erro ao enviar email")
        }
      )
      console.log("deu certo000000")

      // const aluno = await prisma.aluno.update({
      //   data: {
      //     senha: hash,
      //   },
      //   where: {
      //     id: alunoExist.id,
      //   }
      // });

      // let info = await transporder.sendMail({
      //   from: 'acompi <acompi110@gmail.com>',
      //   to: email,
      //   subject: "Alteração de senha da conta",
      //   html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=http://localhost:3000/modificar-senha/' + email + '>.Clique Aqui.</a>',
      //   text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      // });

      return res.status(201).json("Deu certo");


    } else if (email.indexOf('coord-ads.capic@ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const administradorExist = await prisma.administrador.findFirst({
        where: {
          email: email,
        }
      });
      if(!administradorExist) throw new Error("Administrador não cadastrado");

      let info = await transporder.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: email,
        subject: "Alteração de senha da conta",
        html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=http://localhost:3000/login>.Clique Aqui.</a>',
        text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      }).then(
        async () => {
          const administrador = await prisma.administrador.update({
            data: {
              senha: hash,
            },
            where: {
              id: administradorExist.id,
            }
          }).then(
            () => {
              return res.status(201).json("Email enviado")
            }
          ).catch(
            () => {
              return res.status(400).json("Usuario não encontrado")
            }
          )
        } 
      ).catch(
        () => {
          return res.status(400).json("Erro ao enviar e-mail")
        }
      )

      // const administrador = await prisma.administrador.update({
      //   data: {
      //     senha: hash,
      //   },
      //   where: {
      //     id: administradorExist.id,
      //   }
      // });
      return res.status(201).json("Deu Certo")


    } else if (email.indexOf('ifpi.edu.br') !== -1 && senha == confirmasenha) {
      const professorExist = await prisma.professor.findFirst({
        where: {
          email: email,
          AND: [
            {
              status: true
            },
          ],
        }
      });
      if(!professorExist) throw new Error("Professor não cadastrado");

      let info = await transporder.sendMail({
        from: 'acompi <acompi110@gmail.com>',
        to: email,
        subject: "Alteração de senha da conta",
        html: '<h1>Alteração de senha</h1> <p>Clique no link para modificar sua senha.</p><a href=http://localhost:3000/login>.Clique Aqui.</a>',
        text: "Clique no link para modificar sua senha.\n ${confirmationCode}",
      }).then(
        async () => {
          const professor = await prisma.professor.update({
            data: {
              senha: hash,
            },
            where: {
              id: professorExist.id,
            }
          }).then(
            () => {
              return res.status(201).json("Email enviado")
            }
          ).catch(
            () => {
              return res.status(400).json("Usuario não encontrado")
            }
          )
        }
      ).catch(
        () => {
          return res.status(400).json("Erro ao enviar email")
        }
      )

      // const professor = await prisma.professor.update({
      //   data: {
      //     senha: hash,
      //   },
      //   where: {
      //     id: professorExist.id,
      //   }
      // });
      return res.status(201).json("Deu certo")
    }

    return res.status(400).json('Erro')
    
  } catch(error) {
    return res.status(400)
  }
})

//.....................................................................................................................

// rotas.get('/', async (req: Request, res: Response) => {
//   const alunos = await prisma.aluno.findMany({});
//   const professores = await prisma.professor.findMany({});
//   const usuarios = await alunos.concat(professores)
//   res.status(200).json(usuarios);
// });

// rotas.patch('/', async(req: Request, res: Response) => {
//   const {email, senha, confirmasenha} = req.body;
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(senha, salt);

//   try{
//     if (email.indexOf('aluno.ifpi.edu.br') !== -1 && senha == confirmasenha) {
//       const alunoExist = await prisma.aluno.findFirst({
//         where: {
//           email: email,
//           AND:[
//             {
//               status: true
//             },
//           ],
//         }
//       });
//       if(!alunoExist) throw new Error("Aluno não cadastrado");
//       const aluno = await prisma.aluno.update({
//         data: {
//           senha: hash,
//         },
//         where: {
//           id: alunoExist.id,
//         }
//       });
//       return res.status(201).json("Deu certo")


//     } else if (email.indexOf('coord-ads.capic@ifpi.edu.br') !== -1 && senha == confirmasenha) {
//       const administradorExist = await prisma.administrador.findFirst({
//         where: {
//           email: email,
//         }
//       });
//       if(!administradorExist) throw new Error("Administrador não cadastrado");
//       const administrador = await prisma.administrador.update({
//         data: {
//           senha: hash,
//         },
//         where: {
//           id: administradorExist.id,
//         }
//       });
//       return res.status(201).json("Deu Certo")


//     } else if (email.indexOf('ifpi.edu.br') !== -1 && senha == confirmasenha) {
//       const professorExist = await prisma.professor.findFirst({
//         where: {
//           email: email,
//           AND: [
//             {
//               status: true
//             },
//           ],
//         }
//       });
//       if(!professorExist) throw new Error("Professor não cadastrado");
//       const professor = await prisma.professor.update({
//         data: {
//           senha: hash,
//         },
//         where: {
//           id: professorExist.id,
//         }
//       });
//       return res.status(201).json("Deu certo")
//     }

//     return res.status(400).json('Erro')
    
//   } catch(error) {
//     return res.status(400)
//   }
// })
export default rotas;