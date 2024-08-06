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