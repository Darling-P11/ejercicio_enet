import { Request, Response } from 'express';
import { UserCashService } from '../services/usercash.service';

const service = new UserCashService();

export const getUserCash = async (_req: Request, res: Response) => {
  const result = await service.getAll();
  res.json(result);
};

export const assignUserCash = async (req: Request, res: Response) => {
  try {
    const created = await service.assign(req.body);
    res.status(201).json({ message: 'Asignación creada', created });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const removeUserCash = async (req: Request, res: Response) => {
  try {
    const user_userid = parseInt(req.params.userid);
    const cash_cashid = parseInt(req.params.cashid);
    const result = await service.remove(user_userid, cash_cashid);
    res.json({ message: 'Asignación eliminada', result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
