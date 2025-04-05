import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { User } from './User';
  import { Cash } from './Cash';
  
  @Entity()
  export class UserCash {
    @PrimaryColumn()
    user_userid!: number;
  
    @PrimaryColumn()
    cash_cashid!: number;
  
    @ManyToOne(() => User, (user) => user.usercash)
    @JoinColumn({ name: 'user_userid' })
    user!: User;
  
    @ManyToOne(() => Cash, (cash) => cash.usercash)
    @JoinColumn({ name: 'cash_cashid' })
    cash!: Cash;
  }
  