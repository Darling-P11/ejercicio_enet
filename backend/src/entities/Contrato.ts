import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './Client';
import { Servicio } from './Servicio';

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clienteId' })
  cliente!: Client;

  @ManyToOne(() => Servicio)
  @JoinColumn({ name: 'servicioId' })
  servicio!: Servicio;

  @Column()
  formaPago!: string;

  @Column({ default: 'VIG' }) // VIG, SUS, CAN, REN
  estado!: string;

  @Column({ type: 'date' })
  fechaInicio!: string;

  @Column({ type: 'date' })
  fechaFin!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn!: Date;
}
