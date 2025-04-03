import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from './User';
  import { Client } from './Client';
  
  @Entity()
  export class Turno {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    tipo!: string; // AC = Atención al cliente, PS = Pago servicio
  
    @Column({ unique: true })
    descripcion!: string; // Ej: AC0001
  
    @Column({ default: 'pendiente' }) // pendiente | atendido | cancelado
    estado!: string;
  
    @CreateDateColumn()
    fecha!: Date;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'cajeroId' })
    cajero!: User;
  
    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clienteId' })
    cliente!: Client;
  }
  