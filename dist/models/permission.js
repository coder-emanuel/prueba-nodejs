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
exports.Permission = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const roleTable_1 = require("./roleTable");
const entitiesTable_1 = require("./entitiesTable");
let Permission = class Permission extends sequelize_typescript_1.Model {
};
exports.Permission = Permission;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roleTable_1.Role),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Permission.prototype, "roleId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => entitiesTable_1.Entity),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Permission.prototype, "entityId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Permission.prototype, "canCreate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Permission.prototype, "canUpdate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Permission.prototype, "canDelete", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Permission.prototype, "canGet", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roleTable_1.Role),
    __metadata("design:type", roleTable_1.Role)
], Permission.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => entitiesTable_1.Entity),
    __metadata("design:type", entitiesTable_1.Entity)
], Permission.prototype, "entity", void 0);
exports.Permission = Permission = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'permissions',
        timestamps: false,
    })
], Permission);
