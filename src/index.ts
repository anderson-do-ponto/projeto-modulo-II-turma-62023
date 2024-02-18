// src/index.ts
import express from 'express';
import 'dotenv/config';
import { initializeDatabase } from './database/connection';
import userRoutes from './routes/userRoutes';
import authMiddleware from './utils/authMiddleware';
import productRouter from './routes/productRouter';
import adminAuthMiddleware from './utils/adminAuthMiddleware';

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

app.use(authMiddleware);

app.use('/products', productRouter);

app.listen(PORT, () => {
  console.log(`Servidor is running in http://localhost:${PORT}`);
});
