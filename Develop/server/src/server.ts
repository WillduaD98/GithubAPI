const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// 🧠 Esto es para usar __dirname en ES Modules (como parece ser tu caso)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Servir archivos estáticos del frontend (Vite build)
app.use(express.static(path.resolve(__dirname, '../../../client/dist')));

// ✅ Parsear JSON
app.use(express.json());

// ✅ Rutas de tu backend
app.use(routes);

// ✅ Fallback para SPA (React Router)
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

// ✅ Sincronizar DB y arrancar servidor
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
  });
});
