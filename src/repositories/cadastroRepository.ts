import { prisma } from "../services/index";
import { Usuario } from "../models/cadastro"

export const getAll = async () => {
  const alunos = await prisma.aluno.findMany({});
  const professores = await prisma.professor.findMany({});
  const usuarios = await alunos.concat(professores)
  return usuarios;
};

export const getAlunoByID = async (alunoID: number) => {
  const aluno = await prisma.aluno.findFirst({
    where: {
      id: alunoID
    },
    include: {
      reservas:{},
    },
  });
  return aluno;
};

export const criaAluno = async (data: Usuario) => {
  const usuario = await prisma.aluno.create({
    data,
  });
  return usuario;
};

export const criaProfessor = async (data: Usuario) => {
  const usuario = await prisma.professor.create({
    data,
  });
  return usuario;
};

export const buscaTokenAluno = async (token: string) => {
  const aluno = await prisma.aluno.findUnique({
    where: {
      codigo_confirmacao: token,
    },
  })
  return aluno;
};

export const buscaTokenProfessor = async (token: string) => {
  const professor = await prisma.professor.findUnique({
    where: {
      codigo_confirmacao: token,
    },
  })
  return professor;
};

export const atualizaStatusAluno = async (id: number) => {
  const aluno = await prisma.aluno.update({
    where: {
      id,
    },
    data: {
      status: true,
    },
  })
  return aluno;
};

export const atualizaStatusProfessor = async (id: number) => {
  const professor = await prisma.professor.update({
    where: {
      id,
    },
    data: {
      status: true,
    },
  })
  return professor;
};

export const deletaAlunosInvalidos = async (email: string, id: number) => {
  await prisma.aluno.deleteMany({
    where: {
      AND: [
        {
          email,
        },
        {
          id: {
            not: id,
          }
        },
      ],
    },
  })
  return;
};

export const deletaProfessoresInvalidos = async (email: string, id: number) => {
  await prisma.professor.deleteMany({
    where: {
      AND: [
        {
          email,
        },
        {
          id: {
            not: id,
          }
        },
      ],
    },
  })
  return;
};


export const deletaAluno = async (id: number) => {
  await prisma.aluno.delete({
    where: {
      id,
    },
  });
  return;
};

export const deletaProfessor = async (id: number) => {
  await prisma.professor.delete({
    where: {
      id,
    },
  });
  return;
};