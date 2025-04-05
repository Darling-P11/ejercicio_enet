import bcrypt from 'bcrypt';
//ENCRIPTAR Y COMPRAR CONTRASEÑA
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
