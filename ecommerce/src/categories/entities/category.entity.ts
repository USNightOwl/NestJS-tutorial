import { Product } from 'src/products/entities/product.entity';
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

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  // relationship

  // one user can add a new category (many to one)
  @ManyToOne(() => User, (user) => user.categories)
  addedBy: User;

  // one category can have many product (one product have one categogy) (one to many)
  @OneToMany(() => Product, (prod) => prod.category)
  products: Product[];
}
