import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'roles',
    timestamps: false,
  })
  export class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @Column(DataType.STRING)
    name!: string;
  }
  