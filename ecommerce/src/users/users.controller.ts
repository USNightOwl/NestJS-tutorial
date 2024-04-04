import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { User } from './entities/user.entity';
import { UserSignInDTO } from './dto/user-signin.dto';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignUpDTO: UserSignUpDTO): Promise<{ user: User }> {
    return { user: await this.usersService.signup(userSignUpDTO) };
  }

  @Post('signin')
  async signin(
    @Body() userSignInDTO: UserSignInDTO,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.usersService.signin(userSignInDTO);
    const accessToken = await this.usersService.accessToken(user);

    return { accessToken, user };
  }

  @UseGuards(AuthenticationGuard)
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
