import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombres!: string;

  @Column()
  apellidos!: string;

  @Column({ unique: true })
  identificacion!: string;

  @Column()
  correo!: string;

  @Column()
  telefono!: string;

  @Column({ length: 100 })
  direccion!: string;

  @Column({ length: 100 })
  referencia!: string;

  @Column({ default: 'activo' }) // activo | inactivo
  estado!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn!: Date;
}
