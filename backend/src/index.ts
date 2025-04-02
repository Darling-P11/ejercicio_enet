import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (_req, res) => {
  res.send('API funcionando...');
});

// ✅ Aquí conectas tus rutas
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);

// Inicializa la base de datos y levanta el servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conexión a la base de datos establecida');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('❌ Error al conectar con la base de datos:', error));
