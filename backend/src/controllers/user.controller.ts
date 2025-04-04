import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { isValidUsername, isValidPassword } from '../utils/validators';

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

  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, role } = req.body;
      const creator = (req as any).user;
  
      if (!username || !password || !role) {
        return res.status(400).json({ message: 'Campos requeridos' });
      }
  
      if (!isValidUsername(username)) {
        return res.status(400).json({ message: 'Nombre de usuario inválido' });
      }
  
      if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Contraseña inválida' });
      }
  
      const existing = await userRepo.findOneBy({ username });
      if (existing) return res.status(400).json({ message: 'Usuario ya existe' });
  
      const hashed = await hashPassword(password);
  
      // Por defecto, los usuarios creados por gestores quedan como pendientes
      const nuevoUsuario = userRepo.create({
        username,
        password: hashed,
        role,
        estado: 'pendiente',
        aprobado: creator.role === 'admin',
      });
  
      await userRepo.save(nuevoUsuario);
  
      return res.status(201).json({
        message: creator.role === 'admin' ? 'Usuario creado y aprobado' : 'Usuario creado, pendiente de aprobación',
      });
    } catch (err) {
      return res.status(500).json({ message: 'Error al crear usuario', error: err });
    }
  }


  static async aprobarUsuario(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const admin = (req as any).user;
  
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' });
    }
  
    const usuario = await userRepo.findOneBy({ id: parseInt(id) });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  
    usuario.aprobado = true;
    usuario.estado = 'activo';
    await userRepo.save(usuario);
  
    return res.json({ message: 'Usuario aprobado correctamente' });
  }

  static async eliminarUsuario(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
  
    const usuario = await userRepo.findOneBy({ id: parseInt(id) });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  
    usuario.estado = 'inactivo';
    await userRepo.save(usuario);
  
    return res.json({ message: 'Usuario inactivado correctamente' });
  }

  static async listarUsuarios(req: Request, res: Response): Promise<Response> {
    const usuarios = await userRepo.find({ where: { estado: 'activo' } });
    return res.json(usuarios);
  }
  
  
  
}
