import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { User } from './User';
  import { Cash } from './Cash';
  import { AttentionType } from './AttentionType';
  import { OneToMany } from 'typeorm';
  import { Attention } from './Attention';

  @Entity()
  export class Turn {
    @PrimaryGeneratedColumn()
    turnid!: number;
  
    @Column({ unique: true, length: 10 })
    turncode!: string;
  
    @Column()
    createdate!: Date;
  
    @ManyToOne(() => Cash, (cash) => cash.turns)
    @JoinColumn({ name: 'cash_cashid' })
    cash!: Cash;
  
    @ManyToOne(() => User, (user) => user.turns)
    @JoinColumn({ name: 'user_userid' })
    user!: User;


  
    @ManyToOne(() => AttentionType, (type) => type.attentions)
    @JoinColumn({ name: 'attentiontype_attentiontypeid' })
    attentiontype!: AttentionType;

    @OneToMany(() => Attention, (a) => a.turn)
    attentions!: Attention[];

  }
  