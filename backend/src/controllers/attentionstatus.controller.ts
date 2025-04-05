import { Request, Response } from 'express';
import { AttentionStatusService } from '../services/attentionstatus.service';

const service = new AttentionStatusService();

export const getAttentionStatuses = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createAttentionStatus = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateAttentionStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.update(id, req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteAttentionStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Estado de atención eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
