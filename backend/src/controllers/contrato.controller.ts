import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Contrato } from '../entities/Contrato';
import { Client } from '../entities/Client';
import { Servicio } from '../entities/Servicio';

const contratoRepo = AppDataSource.getRepository(Contrato);
const clientRepo = AppDataSource.getRepository(Client);
const servicioRepo = AppDataSource.getRepository(Servicio);

export class ContratoController {
  static async crearContrato(req: Request, res: Response): Promise<Response> {
    const { clienteId, servicioId, formaPago, fechaInicio, fechaFin } = req.body;

    const cliente = await clientRepo.findOneBy({ id: clienteId });
    const servicio = await servicioRepo.findOneBy({ id: servicioId });

    if (!cliente || !servicio) return res.status(404).json({ message: 'Cliente o servicio no encontrado' });

    const contrato = contratoRepo.create({
      cliente,
      servicio,
      formaPago,
      fechaInicio,
      fechaFin,
      estado: 'VIG',
    });

    await contratoRepo.save(contrato);
    return res.status(201).json({ message: 'Contrato creado', contrato });
  }

  static async cambiarServicio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nuevoServicioId } = req.body;

    const contratoActual = await contratoRepo.findOne({
      where: { id: parseInt(id) },
      relations: ['cliente'],
    });

    if (!contratoActual) return res.status(404).json({ message: 'Contrato no encontrado' });

    contratoActual.estado = 'SUS';
    await contratoRepo.save(contratoActual);

    const nuevoServicio = await servicioRepo.findOneBy({ id: nuevoServicioId });

    const nuevoContrato = contratoRepo.create({
      cliente: contratoActual.cliente,
      servicio: nuevoServicio!,
      formaPago: contratoActual.formaPago,
      fechaInicio: contratoActual.fechaInicio,
      fechaFin: contratoActual.fechaFin,
      estado: 'REN',
    });

    await contratoRepo.save(nuevoContrato);
    return res.json({ message: 'Contrato renovado con nuevo servicio', nuevoContrato });
  }

  static async cambiarFormaPago(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nuevaFormaPago } = req.body;

    const contrato = await contratoRepo.findOneBy({ id: parseInt(id) });
    if (!contrato) return res.status(404).json({ message: 'Contrato no encontrado' });

    contrato.formaPago = nuevaFormaPago;
    await contratoRepo.save(contrato);

    return res.json({ message: 'Forma de pago actualizada' });
  }

  static async cancelarContrato(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fechaFin } = req.body;

    const contrato = await contratoRepo.findOneBy({ id: parseInt(id) });
    if (!contrato) return res.status(404).json({ message: 'Contrato no encontrado' });

    contrato.estado = 'CAN';
    contrato.fechaFin = fechaFin;
    await contratoRepo.save(contrato);

    return res.json({ message: 'Contrato cancelado' });
  }
}
