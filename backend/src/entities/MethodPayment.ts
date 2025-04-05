import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from './Contract';

@Entity()
export class MethodPayment {
  @PrimaryGeneratedColumn()
  methodpaymentid!: number;

  @Column()
  description!: string;

  @OneToMany(() => Contract, (contract) => contract.methodpayment)
  contracts!: Contract[];
}
