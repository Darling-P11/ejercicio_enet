import { AppDataSource } from './data-source';
import { Rol } from '../entities/Rol';
import { UserStatus } from '../entities/UserStatus';

async function seed() {
  await AppDataSource.initialize();

  const rolRepo = AppDataSource.getRepository(Rol);
  const statusRepo = AppDataSource.getRepository(UserStatus);

  const roles = ['admin', 'gestor', 'cajero', 'cliente'];
  const statuses = ['pendiente', 'activo', 'bloqueado'];

  for (const rolname of roles) {
    const exists = await rolRepo.findOneBy({ rolname });
    if (!exists) {
      const rol = rolRepo.create({ rolname }); // No se asigna rolid
      await rolRepo.save(rol);
      console.log(`✅ Rol creado: ${rolname}`);
    }
  }

  for (const description of statuses) {
    const exists = await statusRepo.findOneBy({ description });
    if (!exists) {
      const status = statusRepo.create({ description }); // ❌ statusid eliminado
      await statusRepo.save(status);
      console.log(`✅ Estado creado: ${description}`);
    }
  }

  console.log('🎉 Seed finalizado.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Error al ejecutar seed:', error);
  process.exit(1);
});
