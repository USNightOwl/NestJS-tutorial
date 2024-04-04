import { Category } from 'src/categories/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Roles } from 'src/utils/common/user-roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  // relationship relationship

  // one user can add a new category (one to many)
  @OneToMany(() => Category, (cat) => cat.addedBy)
  categories: Category[];

  // one user can create a new product (one to many)
  @OneToMany(() => Product, (prod) => prod.addedBy)
  products: Product[];

  // one user can create new orders (one to many)
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // one (other) user can update order (one to many)
  @OneToMany(() => Order, (order) => order.updatedBy)
  ordersUpdateBy: User[];

  // one user can create multiple review (one to many)
  @OneToMany(() => Review, (rev) => rev.user)
  reviews: Review[];
}
