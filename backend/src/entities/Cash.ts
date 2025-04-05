import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
  import { Turn } from './Turn';
  import { Attention } from './Attention';
  import { UserCash } from './UserCash';

  
  @Entity()
  export class Cash {
    @PrimaryGeneratedColumn()
    cashid!: number;
  
    @Column({ length: 30 })
    name!: string;
  
    @Column({ length: 100 })
    location!: string;
  
    @OneToMany(() => Turn, (turn) => turn.cash)
    turns!: Turn[];
  
    
    @OneToMany(() => UserCash, (usercash) => usercash.cash)
    usercash!: UserCash[];

  }
  