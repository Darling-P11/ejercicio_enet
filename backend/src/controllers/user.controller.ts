import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const creatorRol = req.body.creatorRol || 'admin'; // por ahora fijo
    const user = await userService.createUser(req.body, creatorRol);
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsersByStatus('pendiente');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const approver = req.user?.username || 'admin';

    const result = await userService.approveUser(userId, approver);
    res.json({ message: 'Usuario aprobado', result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userService.updateUser(userId, req.body);
    res.json({ message: 'Usuario actualizado', result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
  
};

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userService.deactivateUser(userId);
    res.json({ message: 'Usuario bloqueado correctamente', result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


