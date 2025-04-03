import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Turno } from '../entities/Turno';
import { Client } from '../entities/Client';
import { User } from '../entities/User';
import { generarDescripcionTurno } from '../services/turno.service';

const turnoRepo = AppDataSource.getRepository(Turno);
const clientRepo = AppDataSource.getRepository(Client);
const userRepo = AppDataSource.getRepository(User);

export class TurnoController {
    static async crearTurno(req: Request, res: Response): Promise<Response> {
        try {
          const { tipo, clienteId } = req.body;
          const usuario = (req as any).user;
      
          if (usuario.role !== 'cajero') {
            return res.status(403).json({ message: 'Solo un cajero puede crear turnos' });
          }
      
          const cliente = await clientRepo.findOneBy({ id: clienteId });
          if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
      
          const cajero = await userRepo.findOneBy({ id: usuario.id });
          if (!cajero) return res.status(404).json({ message: 'Cajero no encontrado' });
      
          const descripcion = await generarDescripcionTurno(tipo);
      
          const nuevoTurno = turnoRepo.create({
            tipo,
            descripcion,
            cajero,
            cliente,
          });
      
          await turnoRepo.save(nuevoTurno);
          return res.status(201).json({ message: 'Turno generado', turno: nuevoTurno });
        } catch (err) {
          return res.status(500).json({ message: 'Error al crear turno', error: err });
        }
      }
      

  static async listarTurnos(req: Request, res: Response): Promise<Response> {
    const turnos = await turnoRepo.find({
      relations: ['cajero', 'cliente'],
      order: { fecha: 'DESC' },
    });
    return res.json(turnos);
  }

  static async finalizarTurno(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const turno = await turnoRepo.findOneBy({ id: parseInt(id) });
    if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

    turno.estado = 'atendido';
    await turnoRepo.save(turno);

    return res.json({ message: 'Turno finalizado' });
  }
}
