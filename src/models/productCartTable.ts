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
  import { Cart } from './cartTable';
  import { Product } from './productTable';
  
  @Table({
    tableName: 'product_cart',
    timestamps: false,
  })
  export class ProductCart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => Cart)
    @Column(DataType.INTEGER)
    cartId!: number;
  
    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId!: number;
  
    @Column(DataType.INTEGER)
    quantity!: number;
  
    @BelongsTo(() => Cart)
    cart!: Cart;
  
    @BelongsTo(() => Product)
    product!: Product;
  }
  