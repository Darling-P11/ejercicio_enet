import { AppDataSource } from '../config/data-source';
import { Rol } from '../entities/Rol';

export class RolService {
  private rolRepo = AppDataSource.getRepository(Rol);

  async getAll() {
    return await this.rolRepo.find();
  }

  async create(data: any) {
    const newRol = this.rolRepo.create(data);
    return await this.rolRepo.save(newRol);
  }

  async update(id: number, data: any) {
    const rol = await this.rolRepo.findOneBy({ rolid: id });
    if (!rol) throw new Error('Rol no encontrado.');

    rol.rolname = data.rolname || rol.rolname;
    return await this.rolRepo.save(rol);
  }

  async delete(id: number) {
    const rol = await this.rolRepo.findOneBy({ rolid: id });
    if (!rol) throw new Error('Rol no encontrado.');

    return await this.rolRepo.remove(rol); // Eliminación real
  }
}
