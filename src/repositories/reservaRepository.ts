import { prisma } from "../services/index";
import { Reserva } from "../models/reserva";

export const contaReservasTurma = async (id_turma: number) => {
  const reservas = await prisma.reserva.count({
    where: {
      id_turma: id_turma,
    },
  });
  return reservas;
}

export const criaReserva = async (data: Reserva) => {
  const reserva = await prisma.reserva.create({
    data,
  });
  return reserva;
}

export const deletaReserva = async (id: number) => {
  await prisma.reserva.delete({
    where: {
      id,
    },
  });
  return;
};