import { AppDataSource } from '../config/data-source';
import { Turn } from '../entities/Turn';

export const generateTurnCode = async (prefix: string): Promise<string> => {
  const repo = AppDataSource.getRepository(Turn);

  const lastTurn = await repo
    .createQueryBuilder('turn')
    .where('turn.turncode LIKE :prefix', { prefix: `${prefix}%` })
    .orderBy('turn.turncode', 'DESC')
    .getOne();

  let nextNumber = 1;

  if (lastTurn) {
    const lastNumber = parseInt(lastTurn.turncode.slice(2));
    nextNumber = lastNumber + 1;
  }

  const formatted = nextNumber.toString().padStart(4, '0');
  return `${prefix}${formatted}`;
};
