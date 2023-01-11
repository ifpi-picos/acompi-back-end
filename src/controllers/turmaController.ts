import { Request, Response } from "express";
import { deletaTurma, getAll, getByID, getReservasByTurma, getProfessorTurmasById, criaTurma, getByDataHora } from "../repositories/turmaRepository";

export const get = async (req: Request, res: Response) =>  {
  try {
    const turmas = await getAll();
    res.status(200).send(turmas);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getTurma = async (req: Request, res: Response) => {
  try {
    const turma = await getByID(Number(req.params.id));
    res.status(200).send(turma);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getTurmasIdProfessor = async (req: Request, res: Response) => {
  try {
    const turmas = await getProfessorTurmasById(Number(req.params.id));
    res.status(200).send(turmas);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await getReservasByTurma(Number(req.params.id));
    res.status(200).send(reservas);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const cria = async (req: Request, res: Response) => {
  try {
    if(req.body.horario_fim - req.body.horario_inicio != 1) throw "Erro de horário";
    const verificaTurma = getByDataHora(req.body.data_turma, req.body.horario_inicio.toString()+":00");
    if (verificaTurma != null) throw "Já existe uma turma nesse horário";
    req.body.horario_inicio = req.body.horario_inicio.toString()+":00";
    req.body.horario_fim = req.body.horario_fim.toString()+":00";
    const turma = await criaTurma(req.body);
    res.status(201).send(turma);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const deleta = async (req: Request, res: Response) => {
  try {
    await deletaTurma(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};