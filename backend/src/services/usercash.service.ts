import { AppDataSource } from '../config/data-source';
import { UserCash } from '../entities/UserCash';

export class UserCashService {
  private repo = AppDataSource.getRepository(UserCash);

  async getAll() {
    return await this.repo.find({ relations: ['user', 'cash'] });
  }

  async assign(data: any) {
    const exists = await this.repo.findOneBy({
      user_userid: data.user_userid,
      cash_cashid: data.cash_cashid
    });

    if (exists) throw new Error('Ya existe esta asignación');

    const relation = this.repo.create(data);
    return await this.repo.save(relation);
  }

  async remove(user_userid: number, cash_cashid: number) {
    const relation = await this.repo.findOneBy({ user_userid, cash_cashid });
    if (!relation) throw new Error('Asignación no encontrada');

    return await this.repo.remove(relation);
  }
}
