import { Request, Response } from 'express';
import { DeviceService } from '../services/device.service';

const service = new DeviceService();

export const getDevices = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createDevice = async (req: Request, res: Response) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ message: 'Dispositivo creado', created });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await service.update(id, req.body);
    res.json({ message: 'Dispositivo actualizado', updated });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Dispositivo eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
