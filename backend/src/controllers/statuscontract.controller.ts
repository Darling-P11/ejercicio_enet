import { Request, Response } from 'express';
import { StatusContractService } from '../services/statuscontract.service';

const service = new StatusContractService();

export const getStatusContracts = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createStatusContract = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateStatusContract = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.update(id, req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteStatusContract = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Estado de contrato eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
