import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { User } from './userTable'; // Asegúrate de importar correctamente el modelo User
  
  @Table({
    tableName: 'carts',
    timestamps: true,
  })
  export class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;
  
    @BelongsTo(() => User)
    user!: User;
  }
  