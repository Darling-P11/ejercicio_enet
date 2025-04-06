import { Request, Response } from 'express';
import { TurnService } from '../services/turn.service';

const service = new TurnService();

export const createTurn = async (req: Request, res: Response) => {
  try {
    const turn = await service.createTurn(req.body);
    res.status(201).json({ message: 'Turno generado correctamente', turn });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTurns = async (_req: Request, res: Response) => {
  const turns = await service.getAllTurns();
  res.json(turns);
};

export const countTodayAllTurns = async (_req: Request, res: Response) => {
  const count = await service.countTodayAll();
  res.json(count);
};

export const countTurnsByGestorToday = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const count = await service.countTodayByGestor(userId);
  res.json(count);
};

