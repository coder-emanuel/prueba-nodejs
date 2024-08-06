# Paso a paso para iniciar un proyecto Node con TypeScript para una API RESTful

## Crear el proyecto

1. Crear el directorio del proyecto
```bash
mkdir prueba-nodejs
cd prueba-nodejs
```

2. Inicializar el proyecto con npm
```bash
npm init -y
```

3. Instalar TypeScript y otras dependencias necesarias
```bash
npm install typescript ts-node @types/node --save-dev
npm install express @types/express
npm install nodemon --save-dev
npm install mysql2
npm install dotenv
```

4. Inicializar TypeScript
```bash
npx tsc --init
```

5. Editar el archivo `tsconfig.json` para configurar TypeScript
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

6. Crear la estructura de directorios
```bash
mkdir src
mkdir src/config
mkdir src/controllers
mkdir src/interfaces
mkdir src/middleware
mkdir src/models
mkdir src/repositories
mkdir src/routes
mkdir src/services
touch src/index.ts
touch .env
```

7. Configurar Nodemon para facilitar el desarrollo
Crear un archivo `nodemon.json` en la raíz del proyecto con el siguiente contenido:
```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

Agregar un script en el `package.json` para iniciar el servidor con Nodemon:
```json
"scripts": {
  "start": "nodemon"
}
```

### Crear el archivo de configuración de variables de entorno `.env`
```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=mydatabase
PORT=3000
SECRET_KEY_ADMIN=mi_clave_secreta
```

### Crear el acceso a datos

En `src/config`, crear un archivo `db.ts`:
```typescript
import { Sequelize } from "sequelize-typescript";
import env from "dotenv";
import { User } from "../models/userTable";
import { Role } from "../models/roleTable";
import { Product } from "../models/productTable";
import { ProductCart } from "../models/productCartTable";
import { Permission } from "../models/permission";
import { Order } from "../models/orderTable";
import { Entity } from "../models/entitiesTable";
import { Cart } from "../models/cartTable";


env.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User, Role, Product, ProductCart, Permission, Order, Entity, Cart]
});

export default sequelize;
```

### Crear las interfaces
En `src/interfaces`, crear un archivo `user.ts`:
```typescript
export interface User {
    id: number;
    email: string;
    password: string;
    roleId: number;
  }
```

### Crear el controlador
En `src/controllers`, crear un archivo `userController.ts`:
```typescript
import { container } from "tsyringe";
import { UserService } from "../services/userServices";
import { Request, Response } from "express";
import { Security } from "../services/security";

const userService = container.resolve(UserService);
const securityService = container.resolve(Security);

export class UserController {
    // Obtener todos los usuarios
    static async getAllUsers(_: Request, res: Response): Promise<Response> {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Obtener un usuario por ID
    static async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const user = await userService.findUserById(id);
            if (user) {
                return res.status(200).json({
                    message: "User found",
                    user
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Registrar un nuevo usuario
    static async newUserRegister(req: Request, res: Response): Promise<Response> {
        try {
            const encryptedPassword = await securityService.encryptPassword(req.body.password);
            const userCreated = await userService.createUser({
                ...req.body,
                password: encryptedPassword
            });
            return res.status(201).json(userCreated);
        } catch (error) {
            console.error('Error registering new user:', error);
            return res.status(400).json({ message: 'Bad Request', error });
        }
    }

    // Actualizar un usuario existente
    static async userUpdated(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const userUpdates = req.body;
            const updatedUser = await userService.updateUser(userUpdates, id);
            if (updatedUser) {
                return res.status(200).json({
                    message: "User updated",
                    updatedUser
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Eliminar un usuario
    static async userDelete(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id, 10);
            const deleted = await userService.deleteByIdService(id);
            if (deleted) {
                return res.status(200).json({
                    message: 'User successfully deleted',
                    deleted
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

```

### Crear el enrutador
En `src/routes`, crear un archivo `userRouter.ts`:
```typescript
import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRouter = Router();

// Obtener todos los usuarios
userRouter.get('/', UserController.getAllUsers);

// Obtener un usuario por ID
userRouter.get('/:id', UserController.getUserById);

// Registrar un nuevo usuario
userRouter.post('/', UserController.newUserRegister);

// Actualizar un usuario existente
userRouter.put('/:id', UserController.userUpdated);

// Eliminar un usuario
userRouter.delete('/:id', UserController.userDelete);
```

En `src/routes`, crear un archivo `router.ts`:
```typescript
import { Router } from 'express';
import { userRouter } from "./userRouter";
// import { productRouter } from './productRouter';
// import { cartRouter } from './cartRouter';
// import { orderRouter } from './orderRouter';
// import { login } from './login';

export const router: Router = Router();

// Rutas para la gestión de usuarios
router.use('/users', userRouter);

// // Rutas para la gestión de productos
// router.use('/products', productRouter);

// // Rutas para la gestión de carritos de compras
// router.use('/carts', cartRouter);

// // Rutas para la gestión de órdenes
// router.use('/orders', orderRouter);

// // Rutas para autenticación y autorización
// router.use('/auth', login);
```

### Configurar la vista principal (el archivo `index.ts`)
En `src/index.ts`:
```typescript
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
```

### Compilar y ejecutar el proyecto
Compilar el proyecto
```bash
npx tsc
```

Iniciar el servidor con Nodemon
```bash
npm start
```

