import { prisma } from "../services/index";
import { Reserva } from "../models/reserva";

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