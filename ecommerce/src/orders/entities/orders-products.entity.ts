import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('orders_products')
export class OrdersProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  product_unit_price: number;

  @Column()
  product_quantity: number;

  // relationships
  @ManyToOne(() => Order, (order) => order.products)
  order: Order;

  @ManyToOne(() => Product, (prod) => prod.products)
  product: Product;
}
