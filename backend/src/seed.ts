import { AppDataSource } from './config/data-source';
import { Rol } from './entities/Rol';
import { UserStatus } from './entities/UserStatus';

async function seed() {
  await AppDataSource.initialize();

  const rolRepo = AppDataSource.getRepository(Rol);
  const statusRepo = AppDataSource.getRepository(UserStatus);

  const roles = ['admin', 'gestor', 'cajero', 'cliente'].map((name, i) =>
    rolRepo.create({ rolid: i + 1, rolname: name }),
  );
  await rolRepo.save(roles);

  const statuses = [
    { statusid: 'ACT', description: 'Activo' },
    { statusid: 'BLO', description: 'Bloqueado' },
    { statusid: 'PEN', description: 'Pendiente' },
  ].map((s) => statusRepo.create(s));

  await statusRepo.save(statuses);

  console.log('✅ Catálogos insertados');
  process.exit(0);
}

seed();
