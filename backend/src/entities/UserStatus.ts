import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class UserStatus {
  @PrimaryGeneratedColumn()
  statusid!: number;

  @Column()
  description!: string;

  @OneToMany(() => User, (user) => user.userstatus)
  users!: User[];
}
