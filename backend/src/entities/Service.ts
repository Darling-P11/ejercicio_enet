import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from './Contract';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  serviceid!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @OneToMany(() => Contract, (contract) => contract.service)
  contracts!: Contract[];
}
