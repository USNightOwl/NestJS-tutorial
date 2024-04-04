import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDTO } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

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

  async signin(userSignInDTO: UserSignInDTO): Promise<User> {
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDTO.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Bad creadentials.');
    const matchPassword = await compare(
      userSignInDTO.password,
      userExists.password,
    );
    if (!matchPassword) throw new BadRequestException('Bad creadentials.');
    delete userExists.password;
    return userExists;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async accessToken(user: User): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME + 'd' },
    );
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
