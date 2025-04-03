import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  equipos!: string;

  @Column()
  velocidad!: number;

  @Column('decimal')
  precio!: number;
}

