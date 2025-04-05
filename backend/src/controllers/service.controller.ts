import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';

const service = new ServiceService();

export const getServices = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createService = async (req: Request, res: Response) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ message: 'Servicio creado', created });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await service.update(id, req.body);
    res.json({ message: 'Servicio actualizado', updated });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Servicio eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
