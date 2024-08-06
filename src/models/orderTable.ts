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
import { User } from './userTable';
import { ProductCart } from './productCartTable';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => ProductCart)
  @Column(DataType.INTEGER)
  productCartId!: number;

  @Column(DataType.DECIMAL(10, 2))
  total!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => ProductCart)
  productCart!: ProductCart;
}
