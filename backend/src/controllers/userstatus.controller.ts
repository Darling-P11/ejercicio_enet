import { Request, Response } from 'express';
import { UserStatusService } from '../services/userstatus.service';

const service = new UserStatusService();

export const getUserStatuses = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createUserStatus = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.update(id, req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteUserStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Estado eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
