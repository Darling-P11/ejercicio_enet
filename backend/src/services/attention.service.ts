import { AppDataSource } from '../config/data-source';
import { Attention } from '../entities/Attention';
import { Turn } from '../entities/Turn';
import { Client } from '../entities/Client';
import { AttentionType } from '../entities/AttentionType';
import { AttentionStatus } from '../entities/AttentionStatus';

export class AttentionService {
  private repo = AppDataSource.getRepository(Attention);
  private turnRepo = AppDataSource.getRepository(Turn);
  private clientRepo = AppDataSource.getRepository(Client);
  private typeRepo = AppDataSource.getRepository(AttentionType);
  private statusRepo = AppDataSource.getRepository(AttentionStatus);

  async getAll() {
    return await this.repo.find({
      relations: ['turn', 'client', 'attentiontype', 'attentionstatus']
    });
  }

  async create(data: any) {
    const turn = await this.turnRepo.findOneBy({ turnid: data.turnid });
    const client = await this.clientRepo.findOneBy({ clientid: data.clientid });
    const type = await this.typeRepo.findOneBy({ attentiontypeid: data.attentiontypeid });
    const status = await this.statusRepo.findOneBy({ statusid: data.statusid });

    if (!turn || !client || !type || !status)
      throw new Error('Datos inválidos para registrar atención');

    const attention = this.repo.create({
      turn,
      client,
      attentiontype: type,
      attentionstatus: status
    });

    return await this.repo.save(attention);
  }
}
