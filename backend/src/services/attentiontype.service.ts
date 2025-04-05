import { AppDataSource } from '../config/data-source';
import { AttentionType } from '../entities/AttentionType';

export class AttentionTypeService {
  private repo = AppDataSource.getRepository(AttentionType);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const newType = this.repo.create(data);
    return await this.repo.save(newType);
  }

  async update(id: string, data: any) {
    const type = await this.repo.findOneBy({ attentiontypeid: id });
    if (!type) throw new Error('Tipo de atención no encontrado.');

    type.description = data.description || type.description;
    return await this.repo.save(type);
  }

  async delete(id: string) {
    const type = await this.repo.findOneBy({ attentiontypeid: id });
    if (!type) throw new Error('Tipo de atención no encontrado.');
    return await this.repo.remove(type);
  }
}
