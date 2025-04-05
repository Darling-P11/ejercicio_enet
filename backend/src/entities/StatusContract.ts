import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from './Contract';

@Entity()
export class StatusContract {
  @PrimaryGeneratedColumn()
  statusid!: number;

  @Column()
  description!: string;

  @OneToMany(() => Contract, (contract) => contract.statuscontract)
  contracts!: Contract[];
}
