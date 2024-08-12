"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const userTable_1 = require("../models/userTable");
const roleTable_1 = require("../models/roleTable");
const productTable_1 = require("../models/productTable");
const productCartTable_1 = require("../models/productCartTable");
const permission_1 = require("../models/permission");
const orderTable_1 = require("../models/orderTable");
const entitiesTable_1 = require("../models/entitiesTable");
const cartTable_1 = require("../models/cartTable");
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [userTable_1.User, roleTable_1.Role, productTable_1.Product, productCartTable_1.ProductCart, permission_1.Permission, orderTable_1.Order, entitiesTable_1.Entity, cartTable_1.Cart]
});
exports.default = sequelize;
