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

// 🧠 __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ruta absoluta para dist (ajustada desde /server/src hacia /client/dist)
const distPath = path.resolve(__dirname, '../../client/dist');

// ✅ Servir estáticos del frontend
app.use(express.static(distPath));

// ✅ Parsear JSON
app.use(express.json());

// ✅ Rutas backend
app.use(routes);

// ✅ Fallback SPA
app.get('*', (_, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Sync DB y arrancar server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
