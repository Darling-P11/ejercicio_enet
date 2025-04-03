import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Servicio } from '../entities/Servicio';

const servicioRepo = AppDataSource.getRepository(Servicio);

export class ServicioController {
  static async crear(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre, descripcion, equipos, velocidad, precio } = req.body;

      const nuevoServicio = servicioRepo.create({
        nombre,
        descripcion,
        equipos,
        velocidad,
        precio,
      });

      await servicioRepo.save(nuevoServicio);
      return res.status(201).json({ message: 'Servicio creado', servicio: nuevoServicio });
    } catch (err) {
      return res.status(500).json({ message: 'Error al crear servicio', error: err });
    }
  }

  static async listar(_req: Request, res: Response): Promise<Response> {
    const servicios = await servicioRepo.find();
    return res.json(servicios);
  }
}
