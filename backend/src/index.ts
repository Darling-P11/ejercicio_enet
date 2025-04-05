import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'; 

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/auth.routes';
import rolRoutes from './routes/rol.routes';
import userStatusRoutes from './routes/userstatus.routes';
import methodPaymentRoutes from './routes/methodpayment.routes';
import statusContractRoutes from './routes/statuscontract.routes';
import attentionTypeRoutes from './routes/attentiontype.routes';
import attentionStatusRoutes from './routes/attentionstatus.routes';
import clientRoutes from './routes/client.routes';

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
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/userstatuses', userStatusRoutes);
app.use('/api/methodpayments', methodPaymentRoutes);
app.use('/api/statuscontracts', statusContractRoutes);
app.use('/api/attentiontypes', attentionTypeRoutes);
app.use('/api/attentionstatuses', attentionStatusRoutes);
app.use('/api/clients', clientRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializa la base de datos y levanta el servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conexión a la base de datos establecida');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('❌ Error al conectar con la base de datos:', error));
