import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contracto } from './Contrato';

@Entity()
export class MethodPayment {
  @PrimaryGeneratedColumn()
  methodpaymentid!: number;

  @Column()
  description!: string;

  @OneToMany(() => Contracto, (contract) => contracto.methodpayment)
  contracts!: Contracto[];
}
