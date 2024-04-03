import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo = new Todo();

    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepo.save(todo);
  }

  findAllTodosByUserIdNotCompleted(userId: number) {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllTodosByUserIdCompleted(userId: number) {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  update(id: number) {
    return this.todoRepo.update(id, { completed: true });
  }

  remove(id: number) {
    return this.todoRepo.delete(id);
  }
}
