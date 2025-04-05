import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  deviceid!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  brand!: string;

  @Column({ length: 100 })
  model!: string;

  @Column({ nullable: true })
  serialnumber!: string;
}
