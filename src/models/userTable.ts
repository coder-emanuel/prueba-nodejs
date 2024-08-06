
  import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    AllowNull,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { Role } from './roleTable'; // Asegúrate de importar correctamente el modelo Role
  
  @Table({
    tableName: 'users',
    timestamps: true,
  })
  export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;
  
    @ForeignKey(() => Role)
    @Column(DataType.INTEGER)
    roleId!: number;
  
    @BelongsTo(() => Role)
    role!: Role;
  }
  