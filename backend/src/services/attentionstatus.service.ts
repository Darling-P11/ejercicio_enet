import { AppDataSource } from '../config/data-source';
import { AttentionStatus } from '../entities/AttentionStatus';

export class AttentionStatusService {
  private repo = AppDataSource.getRepository(AttentionStatus);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const status = this.repo.create(data);
    return await this.repo.save(status);
  }

  async update(id: number, data: any) {
    const status = await this.repo.findOneBy({ statusid: id });
    if (!status) throw new Error('Estado de atención no encontrado.');

    status.description = data.description || status.description;
    return await this.repo.save(status);
  }

  async delete(id: number) {
    const status = await this.repo.findOneBy({ statusid: id });
    if (!status) throw new Error('Estado de atención no encontrado.');
    return await this.repo.remove(status);
  }
}
