import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { Contract } from './Contract';
  import { Client } from './Client';
  
  @Entity()
  export class Payments {
    @PrimaryGeneratedColumn()
    paymentid!: number;
  
    @Column()
    date!: Date;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount!: number;
  
    @ManyToOne(() => Contract, (contract) => contract.payments)
    @JoinColumn({ name: 'contract_contractid' })
    contract!: Contract;
  
    @ManyToOne(() => Client, (client) => client.payments)
    @JoinColumn({ name: 'client_clientid' })
    client!: Client;
  }
  