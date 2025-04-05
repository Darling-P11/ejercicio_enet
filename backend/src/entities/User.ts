import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Rol } from './Rol';
import { UserStatus } from './UserStatus';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid!: number;

  @Column({ unique: true, length: 20 })
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  createdate!: Date;

  @Column({ nullable: true })
  usercreate!: string;

  @Column({ nullable: true })
  userapproval!: string;

  @Column({ nullable: true })
  dateapproval!: Date;

  @ManyToOne(() => Rol, (rol) => rol.users)
  @JoinColumn({ name: 'rolid' })
  rol!: Rol;

  @ManyToOne(() => UserStatus, (status) => status.users)
  @JoinColumn({ name: 'userstatus_statusid' })
  userstatus!: UserStatus;
}
