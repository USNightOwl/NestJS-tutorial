import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratings: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  // relationship

  // one user can create multiple review (many to one)
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  // one product can have multiple review (many to one)
  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;
}
