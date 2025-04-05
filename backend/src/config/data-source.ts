import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
; // luego lo creamos
import { Client } from '../entities/Client';
import { Turno } from '../entities/Turno';
import { Servicio } from '../entities/Servicio';
import { Contrato } from '../entities/Contrato';
import { Rol } from '../entities/Rol';
import { UserStatus } from '../entities/UserStatus';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'enet_db',
  synchronize: true,
  logging: false,
  entities: [User, Client, Turno, Contrato,Servicio,Rol,UserStatus],
  migrations: [],
  subscribers: [],
});
