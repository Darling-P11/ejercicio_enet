import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

const service = new PaymentService();

export const getPayments = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ message: 'Pago registrado', created });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    res.json({ message: 'Pago eliminado', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
