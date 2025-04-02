import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const userRepo = AppDataSource.getRepository(User);

export class UserController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        return res.status(400).json({ message: 'Campos requeridos' });
      }

      const exists = await userRepo.findOneBy({ username });
      if (exists) return res.status(400).json({ message: 'Usuario ya existe' });

      const hashed = await hashPassword(password);
      const user = userRepo.create({ username, password: hashed, role });
      await userRepo.save(user);

      return res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
      return res.status(500).json({ message: 'Error al registrar usuario', error: err });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      const user = await userRepo.findOneBy({ username });

      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const valid = await comparePassword(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

      const token = generateToken({ id: user.id, username: user.username, role: user.role });

      return res.status(200).json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
      return res.status(500).json({ message: 'Error en login', error: err });
    }
  }
}
