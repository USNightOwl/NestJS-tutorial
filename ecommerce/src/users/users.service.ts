import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(userSignUpDTO: UserSignUpDTO): Promise<User> {
    const userExists = await this.findUserByEmail(userSignUpDTO.email);
    if (userExists) throw new BadRequestException('Email is not available.');

    userSignUpDTO.password = await hash(userSignUpDTO.password, 10);
    let user = await this.userRepository.create(userSignUpDTO);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
