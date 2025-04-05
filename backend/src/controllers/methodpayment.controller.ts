import { Request, Response } from 'express';
import { MethodPaymentService } from '../services/methodpayment.service';

const service = new MethodPaymentService();

export const getMethodPayments = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createMethodPayment = async (req: Request, res: Response) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateMethodPayment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.update(id, req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteMethodPayment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Método eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
