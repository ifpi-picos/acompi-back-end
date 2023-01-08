import { Request, Response } from "express";
import { deletaTurma, getAll, getById } from "../repositories/turmaRepository";

export const get = async (req: Request, res: Response) => {
  try {
    const turmas = await getAll();
    res.status(200).send(turmas);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getTurmasIdProfessor = async (req: Request, res: Response) => {
  try {
    const turmas = await getById(Number(req.params.id));
    res.status(200).send(turmas);
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