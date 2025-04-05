import { AppDataSource } from '../config/data-source';
import { Device } from '../entities/Device';

export class DeviceService {
  private repo = AppDataSource.getRepository(Device);

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const newDevice = this.repo.create(data);
    return await this.repo.save(newDevice);
  }

  async update(id: number, data: any) {
    const device = await this.repo.findOneBy({ deviceid: id });
    if (!device) throw new Error('Dispositivo no encontrado');

    Object.assign(device, data);
    return await this.repo.save(device);
  }

  async delete(id: number) {
    const device = await this.repo.findOneBy({ deviceid: id });
    if (!device) throw new Error('Dispositivo no encontrado');
    return await this.repo.remove(device);
  }
}
