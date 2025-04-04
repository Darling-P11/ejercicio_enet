import { AppDataSource } from '../config/data-source';
import { Turno } from '../entities/Turno';

const turnoRepo = AppDataSource.getRepository(Turno);

//export const generarDescripcionTurno = async (tipo: string): Promise<string> => {
  //const cantidad = await turnoRepo.count({ where: { tipo } });
 // const secuencia = String(cantidad + 1).padStart(4, '0');
 // return `${tipo}${secuencia}`; // Ej: PS0002
//};

export const generarDescripcionTurno = async (tipo: string): Promise<string> => {
  const result = await AppDataSource.query(
    `SELECT generar_codigo_turno($1)`,
    [tipo]
  );

  const descripcion = result[0].generar_codigo_turno;
  return descripcion;
};
