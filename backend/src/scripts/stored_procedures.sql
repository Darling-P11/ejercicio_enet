CREATE OR REPLACE FUNCTION generar_codigo_turno(tipo_atencion TEXT)
RETURNS TEXT AS $$
DECLARE
  cantidad INTEGER;
  secuencia TEXT;
BEGIN
  SELECT COUNT(*) INTO cantidad
  FROM turno
  WHERE tipo = tipo_atencion;

  cantidad := cantidad + 1;
  secuencia := LPAD(cantidad::TEXT, 4, '0');
  RETURN tipo_atencion || secuencia;
END;
$$ LANGUAGE plpgsql;
