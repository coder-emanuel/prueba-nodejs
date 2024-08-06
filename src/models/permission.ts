import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Role } from './roleTable';
  import { Entity } from './entitiesTable';
  
  @Table({
    tableName: 'permissions',
    timestamps: false,
  })
  export class Permission extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => Role)
    @Column(DataType.INTEGER)
    roleId!: number;
  
    @ForeignKey(() => Entity)
    @Column(DataType.INTEGER)
    entityId!: number;
  
    @Column(DataType.BOOLEAN)
    canCreate!: boolean;
  
    @Column(DataType.BOOLEAN)
    canUpdate!: boolean;
  
    @Column(DataType.BOOLEAN)
    canDelete!: boolean;
  
    @Column(DataType.BOOLEAN)
    canGet!: boolean;
  
    @BelongsTo(() => Role)
    role!: Role;
  
    @BelongsTo(() => Entity)
    entity!: Entity;
  }
  