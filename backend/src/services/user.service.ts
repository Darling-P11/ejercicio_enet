import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { Rol } from '../entities/Rol';
import { UserStatus } from '../entities/UserStatus';
import { hashPassword } from '../utils/hash';
import { isValidUsername, isValidPassword } from '../utils/validators';

export class UserService {
  private userRepo = AppDataSource.getRepository(User);
  private rolRepo = AppDataSource.getRepository(Rol);
  private statusRepo = AppDataSource.getRepository(UserStatus);

  async createUser(data: any, creatorRol: string) {
    const { username, email, password, rolid } = data;

    // Validaciones básicas
    if (!isValidUsername(username)) {
      throw new Error('El nombre de usuario debe tener entre 8 y 20 caracteres, incluir letras y al menos un número.');
    }

    if (!isValidPassword(password)) {
      throw new Error('La contraseña debe tener mínimo 8 y máximo 30 caracteres, una mayúscula y un número.');
    }

    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) throw new Error('El nombre de usuario ya existe.');

    const rol = await this.rolRepo.findOneBy({ rolid });
    if (!rol) throw new Error('Rol no válido.');

    // Si es gestor, el estado será pendiente y debe aprobarlo un admin
    const status = await this.statusRepo.findOneBy({
      description: creatorRol === 'gestor' ? 'pendiente' : 'activo'
    });

    const newUser = this.userRepo.create({
      username,
      email,
      password: await hashPassword(password),
      rol,
      userstatus: status!,
      createdate: new Date(),
      usercreate: creatorRol
    });

    return await this.userRepo.save(newUser);
  }

  async getAllUsers() {
    return await this.userRepo.find({
      relations: ['rol', 'userstatus'],
      order: { createdate: 'DESC' }
    });
  }

  async getUsersByStatus(statusDesc: string) {
    return await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rol', 'rol')
      .leftJoinAndSelect('user.userstatus', 'status')
      .where('status.description = :statusDesc', { statusDesc })
      .orderBy('user.createdate', 'DESC')
      .getMany();
  }

  async approveUser(userId: number, approverName: string) {
    const user = await this.userRepo.findOne({
      where: { userid: userId },
      relations: ['userstatus']
    });
  
    if (!user) throw new Error('Usuario no encontrado.');
  
    const activeStatus = await this.statusRepo.findOneBy({ description: 'activo' });
  
    user.userstatus = activeStatus!;
    user.userapproval = approverName;
    user.dateapproval = new Date();
  
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, data: any) {
    const user = await this.userRepo.findOne({
      where: { userid: id },
      relations: ['rol', 'userstatus']
    });
  
    if (!user) throw new Error('Usuario no encontrado.');
  
    if (data.email) user.email = data.email;
  
    if (data.rolid) {
      const newRol = await this.rolRepo.findOneBy({ rolid: data.rolid });
      if (!newRol) throw new Error('Rol no válido.');
      user.rol = newRol;
    }
  
    if (data.statusid) {
      const newStatus = await this.statusRepo.findOneBy({ statusid: data.statusid });
      if (!newStatus) throw new Error('Estado no válido.');
      user.userstatus = newStatus;
    }
  
    return await this.userRepo.save(user);
  }
  
  async deactivateUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { userid: id },
      relations: ['userstatus']
    });
  
    if (!user) throw new Error('Usuario no encontrado.');
  
    const status = await this.statusRepo.findOneBy({ description: 'bloqueado' });
  
    user.userstatus = status!;
    return await this.userRepo.save(user);
  }
  
  
  
}
