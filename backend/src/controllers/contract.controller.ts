import { Request, Response } from 'express';
import { ContractService } from '../services/contract.service';

const service = new ContractService();

export const getContracts = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ message: 'Contrato registrado', created });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await service.updateServiceOrPayment(id, req.body);
    res.json({ message: 'Contrato actualizado', updated });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const cancelContract = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.cancelContract(id);
    res.json({ message: 'Contrato cancelado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
