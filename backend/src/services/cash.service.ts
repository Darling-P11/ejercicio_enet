import { AppDataSource } from '../config/data-source';
import { Cash } from '../entities/Cash';

export class CashService {
  private repo = AppDataSource.getRepository(Cash);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const newCash = this.repo.create(data);
    return await this.repo.save(newCash);
  }

  async update(id: number, data: any) {
    const cash = await this.repo.findOneBy({ cashid: id });
    if (!cash) throw new Error('Caja no encontrada');
    Object.assign(cash, data);
    return await this.repo.save(cash);
  }

  async delete(id: number) {
    const cash = await this.repo.findOneBy({ cashid: id });
    if (!cash) throw new Error('Caja no encontrada');
    return await this.repo.remove(cash);
  }
}
