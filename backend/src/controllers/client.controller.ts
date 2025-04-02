import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Client } from '../entities/Client';
import {
  isValidIdentificacion,
  isValidTelefono,
  isValidTextoLargo,
} from '../utils/validators';

const clientRepo = AppDataSource.getRepository(Client);

export class ClientController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nombres, apellidos, identificacion, correo, telefono, direccion, referencia } = req.body;

      if (!isValidIdentificacion(identificacion)) {
        return res.status(400).json({ message: 'Identificación inválida' });
      }

      if (!isValidTelefono(telefono)) {
        return res.status(400).json({ message: 'Teléfono inválido' });
      }

      if (!isValidTextoLargo(direccion) || !isValidTextoLargo(referencia)) {
        return res.status(400).json({ message: 'Dirección o referencia inválidas' });
      }

      const existente = await clientRepo.findOneBy({ identificacion });
      if (existente) {
        return res.status(400).json({ message: 'Cliente ya registrado' });
      }

      const cliente = clientRepo.create({
        nombres,
        apellidos,
        identificacion,
        correo,
        telefono,
        direccion,
        referencia,
      });

      await clientRepo.save(cliente);
      return res.status(201).json({ message: 'Cliente registrado correctamente' });
    } catch (err) {
      return res.status(500).json({ message: 'Error al registrar cliente', error: err });
    }
  }

  static async getAll(_req: Request, res: Response): Promise<Response> {
    const clientes = await clientRepo.find({ where: { estado: 'activo' } });
    return res.json(clientes);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const cliente = await clientRepo.findOneBy({ id: parseInt(id) });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    cliente.estado = 'inactivo';
    await clientRepo.save(cliente);

    return res.json({ message: 'Cliente eliminado (inactivado)' });
  }
}
