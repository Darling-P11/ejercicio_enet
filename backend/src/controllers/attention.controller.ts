import { Request, Response } from 'express';
import { AttentionService } from '../services/attention.service';

const service = new AttentionService();

export const getAttentions = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createAttention = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json({ message: 'Atención registrada', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
