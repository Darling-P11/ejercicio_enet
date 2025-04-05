import { Request, Response } from 'express';
import { ClientService } from '../services/client.service';

const service = new ClientService();

export const getClients = async (_req: Request, res: Response) => {
  const clients = await service.getAll();
  res.json(clients);
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await service.create(req.body);
    res.status(201).json({ message: 'Cliente registrado', client });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const clientid = parseInt(req.params.id);
    const updated = await service.update(clientid, req.body);
    res.json({ message: 'Cliente actualizado', updated });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientid = parseInt(req.params.id);
    const result = await service.delete(clientid);
    res.json({ message: 'Cliente eliminado lógicamente', result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
