import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = process.env.JWT_SECRET || 'mi_clave';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};

export const hashPassword = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainText, salt);
};

export const comparePassword = async (plainText: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashed);
};
