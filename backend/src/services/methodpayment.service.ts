import { AppDataSource } from '../config/data-source';
import { MethodPayment } from '../entities/MethodPayment';

export class MethodPaymentService {
  private repo = AppDataSource.getRepository(MethodPayment);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const newMethod = this.repo.create(data);
    return await this.repo.save(newMethod);
  }

  async update(id: number, data: any) {
    const method = await this.repo.findOneBy({ methodpaymentid: id });
    if (!method) throw new Error('Método no encontrado.');
    method.description = data.description || method.description;
    return await this.repo.save(method);
  }

  async delete(id: number) {
    const method = await this.repo.findOneBy({ methodpaymentid: id });
    if (!method) throw new Error('Método no encontrado.');
    return await this.repo.remove(method);
  }
}
