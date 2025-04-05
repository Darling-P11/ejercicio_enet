import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Attention } from './Attention';

@Entity()
export class AttentionType {
  @PrimaryColumn({ length: 3 })
  attentiontypeid: string;

  @Column({ length: 100 })
  description: string;

  @OneToMany(() => Attention, (attention) => attention.attentiontype)
  attentions: Attention[];
}
