import { prisma } from "../services/index";
import { Reserva } from "../models/reserva";

export const getAll = async () => {
    const turmas = await prisma.turma.findMany({});
    return turmas;
};

export const getById = async (ProfessorID: number) => {
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

export const deletaTurma = async (id: number) => {
    await prisma.turma.delete({
        where: {
            id,
        },
    })
    return;
};
