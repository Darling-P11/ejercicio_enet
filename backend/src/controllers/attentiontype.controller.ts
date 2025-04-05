import { Request, Response } from 'express';
import { AttentionTypeService } from '../services/attentiontype.service';

const service = new AttentionTypeService();

export const getAttentionTypes = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createAttentionType = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateAttentionType = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await service.update(id, req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteAttentionType = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await service.delete(id);
    res.json({ message: 'Tipo de atención eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
