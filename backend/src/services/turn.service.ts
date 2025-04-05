import { AppDataSource } from '../config/data-source';
import { Turn } from '../entities/Turn';
import { User } from '../entities/User';
import { Cash } from '../entities/Cash';
import { AttentionType } from '../entities/AttentionType';
import { generateTurnCode } from '../utils/turn-generator';

export class TurnService {
  private turnRepo = AppDataSource.getRepository(Turn);
  private userRepo = AppDataSource.getRepository(User);
  private cashRepo = AppDataSource.getRepository(Cash);
  private typeRepo = AppDataSource.getRepository(AttentionType);

  async createTurn(data: any) {
    const { userid, cashid, attentiontypeid } = data;

    const user = await this.userRepo.findOneBy({ userid });
    if (!user) throw new Error('Usuario no encontrado');

    const cash = await this.cashRepo.findOneBy({ cashid });
    if (!cash) throw new Error('Caja no encontrada');

    const type = await this.typeRepo.findOneBy({ attentiontypeid });
    if (!type) throw new Error('Tipo de atención no encontrado');

    // 🔒 Verificar máximo 2 usuarios activos por caja
    const count = await this.turnRepo.count({
      where: { cash: { cashid } }
    });

    if (count >= 2) {
      throw new Error('Ya hay 2 turnos asignados a esta caja');
    }

    const turncode = await generateTurnCode(attentiontypeid);

    const newTurn = this.turnRepo.create({
      turncode,
      createdate: new Date(),
      user,
      cash,
      attentiontype: type
    });

    return await this.turnRepo.save(newTurn);
  }

  async getAllTurns() {
    return await this.turnRepo.find({
      relations: ['user', 'cash', 'attentiontype'],
      order: { createdate: 'DESC' }
    });
  }
}
