import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from '../utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();

    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findUserById(id: number) {
    return this.userRepo.findOneOrFail({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOneOrFail({ where: { email } });
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
