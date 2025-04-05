import { AppDataSource } from '../config/data-source';
import { Service } from '../entities/Service';

export class ServiceService {
  private repo = AppDataSource.getRepository(Service);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const newService = this.repo.create(data);
    return await this.repo.save(newService);
  }

  async update(id: number, data: any) {
    const service = await this.repo.findOneBy({ serviceid: id });
    if (!service) throw new Error('Servicio no encontrado');

    Object.assign(service, data);
    return await this.repo.save(service);
  }

  async delete(id: number) {
    const service = await this.repo.findOneBy({ serviceid: id });
    if (!service) throw new Error('Servicio no encontrado');
    return await this.repo.remove(service);
  }
}
