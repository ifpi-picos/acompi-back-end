// import 'jest';
// import request from 'supertest';
// import app from '../../src/app';
// import prisma from '../helpers/index';

// beforeAll(async () => {
//     await prisma.$connect();
//     const removeReservas = prisma.reserva.deleteMany();
//     await prisma.$transaction([removeReservas]);
//     const RemoveCadastroAluno = prisma.aluno.deleteMany();
//     await prisma.$transaction([RemoveCadastroAluno]);
//     const RemoveTurma = prisma.turma.deleteMany();
//     await prisma.$transaction([RemoveTurma]);
//     const RemoveCadastroProfessor = prisma.professor.deleteMany();
//     await prisma.$transaction([RemoveCadastroProfessor]);
// });

// afterAll(async () => {
//     const removeReservas = prisma.reserva.deleteMany();
//     await prisma.$transaction([removeReservas]);
//     const RemoveCadastroAluno = prisma.aluno.deleteMany();
//     await prisma.$transaction([RemoveCadastroAluno]);
//     const RemoveTurma = prisma.turma.deleteMany();
//     await prisma.$transaction([RemoveTurma]);
//     const RemoveCadastroProfessor = prisma.professor.deleteMany();
//     await prisma.$transaction([RemoveCadastroProfessor]);
//     await prisma.$disconnect();
// });


// describe('Testando reservas dos alunos', () => {
//     // criando aluno
//     async function criaAluno() {
//         const novoCadastro = {
//             nome: "aluno",
//             senha: 'z@467VHb',
//             email: 'capic.2021118tads0149@aluno.ifpi.edu.br',
//         }
//         await request(app).post('/cadastro').send(novoCadastro)
//     }
//     // criando turma
//     async function criaTurma() {
//         const professores = await request(app).get('/cadastro')
//         const professor = await professores.body[1]
//         const novaTurma = {
//             id_professor: professor.id,
//             id_lab: 4,
//             data_turma: "26/03/2022",
//             horario_inicio: "13:00",
//             horario_fim: "14:00",
//             curso: "administração",
//         }
//         await request(app).post('/turmas').send(novaTurma)
//     }
//     // criando professor
//     async function criaProfessor() {
//         const novoCadastroProfessor = {
//             nome: "professor",
//             senha: 'Bz!7Pl90',
//             email: '@ifpi.edu.br0000000000000000000000000000000000000000000',
//         };
//         await request(app).post('/cadastro').send(novoCadastroProfessor);
//     }
//     test('testando o post da reserva (faltando dado)', async () => {
//         await criaProfessor()
//         const novaReserva = {
//             id_aluno: 1,
//             computador: 'sim',
//             curso: 'Informática',
//         };
//         const response = await request(app).post('/reservas').send(novaReserva);
//         expect(response.statusCode).toBe(400);
//     });

//     test('testando o post da reserva (tipo errado de dado)', async () => {
//         await criaAluno()
//         const novaReserva = {
//             id_aluno: true,
//             id_turma: 1,
//             computador: 'sim',
//             curso: 'Informática',
//         };
//         const response = await request(app).post('/reservas').send(novaReserva);
//         expect(response.statusCode).toBe(400);
//     });

//     test('testando o post da reserva (dado errado)', async () => {
//         await criaTurma()
//         const novaReserva = {
//             id_aluno: 1,
//             id_turma: 1,
//             laboratório: 'sim',
//             curso: 'Informática',
//         };
//         const response = await request(app).post('/reservas').send(novaReserva);
//         expect(response.statusCode).toBe(400);
//     });


//     test('testando o post da reserva (sucesso)', async () => {
//         const turmas = await request(app).get('/turmas')
//         const turma = turmas.body[0]
//         const alunos = await request(app).get('/cadastro')
//         const aluno = alunos.body[0]
//         const novaReserva = {
//             id_aluno: aluno.id,
//             id_turma: turma.id,
//             computador: 'sim',
//             curso: 'Informática',
//         };
//         const response = await request(app).post('/reservas').send(novaReserva);
//         expect(response.statusCode).toBe(201);
//     });

//     test('testando o post da reserva com dados repetidos', async () => {
//         const turmas = await request(app).get('/turmas')
//         const turma = turmas.body[0]
//         const alunos = await request(app).get('/cadastro')
//         const aluno = alunos.body[0]
//         const novaReserva = {
//             id_aluno: aluno.id,
//             id_turma: turma.id,
//             computador: 'sim',
//             curso: 'Informática',
//         };
//         const response = await request(app).post('/reservas').send(novaReserva);
//         expect(response.statusCode).toBe(400);
//     });

//     // test('testando o get das reservas', async () => {
//     //   const response = await request(app).get('/reservas');
//     //   const reservas = response.body;
//     //   expect(response.statusCode).toBe(200);
//     //   expect(reservas.length).toBe(1);
//     // });

//     // // test('testando o delete das reservas', async () => {
//     // //   const novaReserva = {
//     // //   id_reserva: 2,
//     // //   id_aluno: 1,
//     // //   id_turma: 1,
//     // //   computador: 'sim',
//     // //   curso: 'Informática',
//     // //   consentimento: 'true',
//     // //   };

//     // //   const cancelaReserva = {
//     // //   id_reserva: 2,
//     // //   };
//     // //   let response = await request(app).post('/reservas').send(novaReserva);
//     // //   response = await request(app).delete('/reservas').send(cancelaReserva);
//     // //   expect(response.statusCode).toBe(200);
//     // // });
// });