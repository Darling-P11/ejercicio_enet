import { AppDataSource } from '../config/data-source';
import { Client } from '../entities/Client';

export class ClientService {
  private repo = AppDataSource.getRepository(Client);

  validate(data: any) {
    const errors: string[] = [];

    if (!/^\d{10,13}$/.test(data.identification)) {
      errors.push('Identificación debe tener entre 10 y 13 dígitos numéricos.');
    }

    if (!/^09\d{8}$/.test(data.phonenumber)) {
      errors.push('Teléfono debe tener 10 dígitos y empezar con 09.');
    }

    if (!data.address || data.address.length < 20 || data.address.length > 100) {
      errors.push('Dirección debe tener entre 20 y 100 caracteres.');
    }

    if (!data.referenceaddress || data.referenceaddress.length < 20 || data.referenceaddress.length > 100) {
      errors.push('Referencia debe tener entre 20 y 100 caracteres.');
    }

    return errors;
  }

  async getAll() {
    return await this.repo.find();
  }

  async create(data: any) {
    const errors = this.validate(data);
    if (errors.length) throw new Error(errors.join('\n'));

    const exists = await this.repo.findOneBy({ identification: data.identification });
    if (exists) throw new Error('Ya existe un cliente con esa identificación.');

    const phoneExists = await this.repo.findOneBy({ phonenumber: data.phonenumber });
    if (phoneExists) throw new Error('Ya existe un cliente con ese número de teléfono.');

    const client = this.repo.create(data);
    return await this.repo.save(client);
  }

  async update(id: number, data: any) {
    const client = await this.repo.findOneBy({ clientid: id });
    if (!client) throw new Error('Cliente no encontrado.');

    const errors = this.validate({ ...client, ...data });
    if (errors.length) throw new Error(errors.join('\n'));

    Object.assign(client, data);
    return await this.repo.save(client);
  }

  async delete(id: number) {
    const client = await this.repo.findOneBy({ clientid: id });
    if (!client) throw new Error('Cliente no encontrado.');

    client.identification = `deleted-${client.clientid}-${client.identification}`;
    return await this.repo.save(client);
  }
}
