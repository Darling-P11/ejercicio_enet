import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attention } from './Attention';

@Entity()
export class AttentionStatus {
  @PrimaryGeneratedColumn()
  statusid!: number;

  @Column({ length: 30 })
  description!: string;

  @OneToMany(() => Attention, (attention) => attention.attentionstatus)
  attentions!: Attention[];
}
