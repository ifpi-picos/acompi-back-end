import { prisma } from "../services/index";
import { Turma } from "../models/turma";

export const getAll = async () => {
    const turmas = await prisma.turma.findMany({ include: { reservas: true } });
    return turmas;
};

export const getByID = async (turmaID: number) => {
    const turma = await prisma.turma.findFirst({
        where: {
            id: +turmaID,
        }
    });
    return turma;
}

export const getByDataHora = async (data_turma: any, horario_inicio: any, id_lab: any) => {
    const turma = await prisma.turma.findMany({
        where: {
            data_turma: data_turma,
            horario_inicio: horario_inicio,
            id_lab: id_lab,
        },
    });
    return turma;
}

export const getProfessorTurmasById = async (ProfessorID: number) => {
    const turmas = await prisma.professor.findMany({
        where: {
            id: +ProfessorID,
        },
        include: {
            turmas: {
                where: {
                    id_professor: +ProfessorID,
                },
            },
        },
    })
    return turmas;
};

export const getReservasByTurma = async (turmaID: number) => {
    const reservas = await prisma.turma.findMany({
        where: {
            id: +turmaID,
        },
        include: {
            reservas: {
                where: {
                    id_turma: +turmaID,
                },
            },
        },
    })
    return reservas;
}

export const criaTurma = async (data: Turma) => {
    const turma = await prisma.turma.create({
        data,
    })
    return turma;
}

export const deletaTurma = async (id: number) => {
    await prisma.turma.delete({
        where: {
            id,
        },
    })
    return;
};
