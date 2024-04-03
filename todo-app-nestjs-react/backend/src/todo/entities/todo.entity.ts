import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  completed: boolean;

  // many todos can belong to single user (many to one)
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
