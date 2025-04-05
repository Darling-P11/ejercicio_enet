import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  rolid!: number;

  @Column({ unique: true })
  rolname!: string;

  @OneToMany(() => User, (user) => user.rol)
  users!: User[];
}
