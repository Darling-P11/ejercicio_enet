import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
; // luego lo creamos
import { Client } from '../entities/Client';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'enet_db',
  synchronize: true,
  logging: false,
  entities: [User, Client],
  migrations: [],
  subscribers: [],
});
