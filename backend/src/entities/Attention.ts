import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Turn } from './Turn';
import { Client } from './Client';
import { AttentionType } from './AttentionType';
import { AttentionStatus } from './AttentionStatus';
import { Cash } from './Cash'; // si deseas usarlo también en la relación

@Entity()
export class Attention {
  @PrimaryGeneratedColumn()
  attentionid!: number;

  @ManyToOne(() => Turn, (turn) => turn.attentions)
  @JoinColumn({ name: 'turn_turnid' })
  turn!: Turn;

  @ManyToOne(() => Client, (client) => client.attentions)
  @JoinColumn({ name: 'client_clientid' })
  client!: Client;

  @ManyToOne(() => AttentionType, (type) => type.attentions)
  @JoinColumn({ name: 'attentiontype_attentiontypeid' })
  attentiontype!: AttentionType;

  @ManyToOne(() => AttentionStatus, (status) => status.attentions)
  @JoinColumn({ name: 'attentionstatus_statusid' })
  attentionstatus!: AttentionStatus;
}
