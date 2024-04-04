import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from 'src/users/entities/user.entity';
import { ShippingAddress } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  orderAt: Timestamp;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: string;

  @Column({ nullable: true })
  shippedAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  // relationships

  // one user can create new orders (many to one)
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // one (other) user can update order (many to one)
  @ManyToOne(() => User, (user) => user.ordersUpdateBy)
  updatedBy: User;

  // order mutiple products
  @OneToMany(() => OrdersProductsEntity, (op) => op.order)
  products: OrdersProductsEntity[];

  // shipping address (one to one)
  @OneToOne(() => ShippingAddress, (ship) => ship.order, { cascade: true })
  @JoinColumn() // order -> shipping address
  shippingAddress: ShippingAddress;
}
