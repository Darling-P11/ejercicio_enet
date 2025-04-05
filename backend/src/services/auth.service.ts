import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['rol', 'userstatus']
    });

    if (!user) throw new Error('Usuario no encontrado.');
    if (user.userstatus.description !== 'activo') throw new Error('Usuario inactivo o no aprobado.');

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta.');

    const token = generateToken({
      userid: user.userid,
      username: user.username,
      rol: user.rol.rolname
    });

    return { token, user: { username: user.username, rol: user.rol.rolname } };
  }
}
