import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const SECRET = process.env.JWT_SECRET || 'clave_secreta';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: User): string {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, {
      expiresIn: '8h',
    });
  }
}
