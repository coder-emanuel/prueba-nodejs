import express from 'express';
import env from 'dotenv';
import sequelize from './config/db';
import { router } from './routes/router';


env.config();  // Configura las variables de entorno desde el archivo .env

const server = express();
server.use(express.json());  // Middleware para manejar JSON
server.use('/api', router);  // Rutas principales

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database Connected");

        server.listen(PORT, () => {
            console.log(`The server is running at http://localhost:${PORT}`);
        });
    } catch (error: any) {
        console.error(`Something went wrong in index.ts:`, error);
    }
};

startServer();

