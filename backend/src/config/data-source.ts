import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
; // luego lo creamos
import { Client } from '../entities/Client';
import { Attention } from '../entities/Attention';
import { AttentionStatus } from '../entities/AttentionStatus';
import { AttentionType } from '../entities/AttentionType';
import { Cash } from '../entities/Cash';
import { Contract } from '../entities/Contract';
import { Device } from '../entities/Device';
import { MethodPayment } from '../entities/MethodPayment';
import { Payments } from '../entities/Payments';
import { Service } from '../entities/Service';
import { StatusContract } from '../entities/StatusContract';
import { UserCash } from '../entities/UserCash';
import { Rol } from '../entities/Rol';
import { UserStatus } from '../entities/UserStatus';
import { Turn } from '../entities/Turn';
import { userInfo } from 'os';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'enet_db',
  synchronize: true,
  logging: false,
  entities: [Attention,AttentionStatus,AttentionType,Cash,Client,Contract,Device,MethodPayment,Payments,Rol,Service,StatusContract,Turn,User,UserCash,UserStatus],
  migrations: [],
  subscribers: [],
});
