import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'products',
    timestamps: true,
  })
  export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @Column(DataType.STRING)
    name!: string;
  
    @Column(DataType.DECIMAL(10, 2))
    price!: number;
  
    @Column(DataType.TEXT)
    description!: string;
  
    @Column(DataType.INTEGER)
    stock!: number;
  }
  