import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm';
  import { Client } from './Client';
  import { MethodPayment } from './MethodPayment';
  import { StatusContract } from './StatusContract';
  import { Service } from './Service';
  import { Payments } from './Payments';
  
  @Entity()
  export class Contract {
    @PrimaryGeneratedColumn()
    contractid!: number;
  
    @Column()
    startdate!: Date;
  
    @Column({ nullable: true })
    enddate!: Date;
  
    @ManyToOne(() => Client, (client) => client.contracts)
    @JoinColumn({ name: 'client_clientid' })
    client!: Client;
  
    @ManyToOne(() => Service, (service) => service.contracts)
    @JoinColumn({ name: 'service_serviceid' })
    service!: Service;
  
    @ManyToOne(() => MethodPayment, (method) => method.contracts)
    @JoinColumn({ name: 'methodpayment_methodpaymentid' })
    methodpayment!: MethodPayment;
  
    @ManyToOne(() => StatusContract, (status) => status.contracts)
    @JoinColumn({ name: 'statuscontract_statusid' })
    statuscontract!: StatusContract;
  
    @OneToMany(() => Payments, (payment) => payment.contract)
    payments!: Payments[];
  }
  