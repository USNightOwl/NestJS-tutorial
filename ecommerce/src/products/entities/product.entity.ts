import { Category } from 'src/categories/entities/category.entity';
import { OrdersProductsEntity } from 'src/orders/entities/orders-products.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  stock: number;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  // relationship

  // one user can create a new product (many to one)
  @ManyToOne(() => User, (user) => user.products)
  addedBy: User;

  // one category can have many product (one product have one categogy) (many to one)
  @ManyToOne(() => Category, (cat) => cat.products)
  category: Category;

  @OneToMany(() => OrdersProductsEntity, (op) => op.product)
  products: OrdersProductsEntity[];

  // one product can have multiple review (one to many)
  @OneToMany(() => Review, (rev) => rev.product)
  reviews: Review[];
}
