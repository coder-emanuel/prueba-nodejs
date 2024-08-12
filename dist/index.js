"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const router_1 = require("./routes/router");
dotenv_1.default.config(); // Configura las variables de entorno desde el archivo .env
const server = (0, express_1.default)();
server.use(express_1.default.json()); // Middleware para manejar JSON
server.use('/api', router_1.router); // Rutas principales
const PORT = process.env.PORT || 3001;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.authenticate();
        yield db_1.default.sync();
        console.log("Database Connected");
        server.listen(PORT, () => {
            console.log(`The server is running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error(`Something went wrong in index.ts:`, error);
    }
});
startServer();
