import { AppDataSource } from '../config/data-source';
import { Contract } from '../entities/Contract';
import { Client } from '../entities/Client';
import { Service } from '../entities/Service';
import { MethodPayment } from '../entities/MethodPayment';
import { StatusContract } from '../entities/StatusContract';

export class ContractService {
  private repo = AppDataSource.getRepository(Contract);
  private clientRepo = AppDataSource.getRepository(Client);
  private serviceRepo = AppDataSource.getRepository(Service);
  private methodRepo = AppDataSource.getRepository(MethodPayment);
  private statusRepo = AppDataSource.getRepository(StatusContract);

  async getAll() {
    return await this.repo.find({
      relations: ['client', 'service', 'methodpayment', 'statuscontract'],
      order: { startdate: 'DESC' }
    });
  }

  async create(data: any) {
    const client = await this.clientRepo.findOneBy({ clientid: data.clientid });
    const service = await this.serviceRepo.findOneBy({ serviceid: data.serviceid });
    const method = await this.methodRepo.findOneBy({ methodpaymentid: data.methodpaymentid });
    const status = await this.statusRepo.findOneBy({ statusid: data.statusid });

    if (!client || !service || !method || !status)
      throw new Error('Datos inválidos: cliente, servicio, método o estado');

    const contract = this.repo.create({
      client,
      service,
      methodpayment: method,
      statuscontract: status,
      startdate: new Date()
    });

    return await this.repo.save(contract);
  }

  async updateServiceOrPayment(id: number, data: any) {
    const contract = await this.repo.findOne({
      where: { contractid: id },
      relations: ['service', 'methodpayment']
    });

    if (!contract) throw new Error('Contrato no encontrado');

    if (data.serviceid) {
      const service = await this.serviceRepo.findOneBy({ serviceid: data.serviceid });
      if (!service) throw new Error('Servicio inválido');
      contract.service = service;
    }

    if (data.methodpaymentid) {
      const method = await this.methodRepo.findOneBy({ methodpaymentid: data.methodpaymentid });
      if (!method) throw new Error('Método de pago inválido');
      contract.methodpayment = method;
    }

    return await this.repo.save(contract);
  }

  async cancelContract(id: number) {
    const contract = await this.repo.findOne({
      where: { contractid: id },
      relations: ['statuscontract']
    });

    if (!contract) throw new Error('Contrato no encontrado');

    const cancelled = await this.statusRepo.findOneBy({ description: 'cancelado' });
    if (!cancelled) throw new Error('Estado cancelado no definido');

    contract.statuscontract = cancelled;
    contract.enddate = new Date();

    return await this.repo.save(contract);
  }
}
