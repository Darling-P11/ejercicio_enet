import { Request, Response } from 'express';
import { CashService } from '../services/cash.service';

const service = new CashService();

export const getCashList = async (_req: Request, res: Response) => {
  const list = await service.getAll();
  res.json(list);
};

export const createCash = async (req: Request, res: Response) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ message: 'Caja creada', created });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateCash = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await service.update(id, req.body);
    res.json({ message: 'Caja actualizada', updated });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteCash = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Caja eliminada', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
