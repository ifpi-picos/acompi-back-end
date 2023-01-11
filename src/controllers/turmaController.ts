import { Request, Response } from "express";
import { deletaTurma, getAll, getByID, getReservasByTurma, getProfessorTurmasById, criaTurma } from "../repositories/turmaRepository";
// import {   } from "../services/turmaService"

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