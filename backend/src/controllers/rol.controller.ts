import { Request, Response } from 'express';
import { RolService } from '../services/rol.service';

const service = new RolService();

export const getRoles = async (_req: Request, res: Response) => {
  const roles = await service.getAll();
  res.json(roles);
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateRol = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.update(id, req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteRol = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Rol eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
