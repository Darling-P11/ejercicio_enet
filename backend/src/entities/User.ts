import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @Column({ default: true })
  active!: boolean;
  
  @Column({ default: 'pendiente' }) // pendiente | activo | bloqueado
  estado!: string;

  @Column({ default: false })
  aprobado!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

}
