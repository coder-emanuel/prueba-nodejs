"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCart = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cartTable_1 = require("./cartTable");
const productTable_1 = require("./productTable");
let ProductCart = class ProductCart extends sequelize_typescript_1.Model {
};
exports.ProductCart = ProductCart;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductCart.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cartTable_1.Cart),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductCart.prototype, "cartId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => productTable_1.Product),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductCart.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductCart.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cartTable_1.Cart),
    __metadata("design:type", cartTable_1.Cart)
], ProductCart.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => productTable_1.Product),
    __metadata("design:type", productTable_1.Product)
], ProductCart.prototype, "product", void 0);
exports.ProductCart = ProductCart = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product_cart',
        timestamps: false,
    })
], ProductCart);
