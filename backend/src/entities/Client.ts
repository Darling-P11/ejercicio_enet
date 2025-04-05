import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from './Contrato';
import { Payments } from './Payments';
import { Attention } from './Attention';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  clientid!: number;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50 })
  lastname!: string;

  @Column({ unique: true, length: 13 })
  identification!: string;

  @Column({ length: 120 })
  email!: string;

  @Column({ unique: true, length: 13 })
  phonenumber!: string;

  @Column({ length: 100 })
  address!: string;

  @Column({ length: 100 })
  referenceaddress!: string;

  @OneToMany(() => Contract, (c) => c.client)
  contracts!: Contract[];

  @OneToMany(() => Payments, (p) => p.client)
  payments!: Payments[];

  @OneToMany(() => Attention, (a) => a.client)
  attentions!: Attention[];
}
