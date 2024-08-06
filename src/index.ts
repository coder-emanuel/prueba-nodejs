import express from 'express';
import env from 'dotenv';
import sequelize from './config/db';
import { router } from './routes/router';

const server = express();
server.use(express.json());
env.config();
server.use('/appi', router);
const PORT = process.env.PORT || 3001

const startserver = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("Database Connected")
        server.listen(PORT, () => {
            console.log(`server executted in http://localhost:${PORT}`);
        })
    } catch (error: any) {
        console.log(`somethings wrong from index.ts`, error)
    }
}

startserver();

