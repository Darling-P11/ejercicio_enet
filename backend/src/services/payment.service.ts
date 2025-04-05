import { AppDataSource } from '../config/data-source';
import { Payments } from '../entities/Payments';
import { Contract } from '../entities/Contract';
import { Client } from '../entities/Client';

export class PaymentService {
  private repo = AppDataSource.getRepository(Payments);
  private clientRepo = AppDataSource.getRepository(Client);
  private contractRepo = AppDataSource.getRepository(Contract);

  async getAll() {
    return await this.repo.find({
      relations: ['client', 'contract'],
      order: { date: 'DESC' }
    });
  }

  async create(data: any) {
    const client = await this.clientRepo.findOneBy({ clientid: data.clientid });
    const contract = await this.contractRepo.findOneBy({ contractid: data.contractid });

    if (!client || !contract) throw new Error('Cliente o contrato inválido');

    const payment = this.repo.create({
      amount: data.amount,
      date: new Date(),
      client,
      contract
    });

    return await this.repo.save(payment);
  }

  async delete(id: number) {
    const payment = await this.repo.findOneBy({ paymentid: id });
    if (!payment) throw new Error('Pago no encontrado');
    return await this.repo.remove(payment);
  }
}
