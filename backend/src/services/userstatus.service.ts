import { AppDataSource } from '../config/data-source';
import { UserStatus } from '../entities/UserStatus';

export class UserStatusService {
  private repo = AppDataSource.getRepository(UserStatus);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const newStatus = this.repo.create(data);
    return await this.repo.save(newStatus);
  }

  async update(id: number, data: any) {
    const status = await this.repo.findOneBy({ statusid: id });
    if (!status) throw new Error('Estado no encontrado.');

    status.description = data.description || status.description;
    return await this.repo.save(status);
  }

  async delete(id: number) {
    const status = await this.repo.findOneBy({ statusid: id });
    if (!status) throw new Error('Estado no encontrado.');
    return await this.repo.remove(status);
  }
}
