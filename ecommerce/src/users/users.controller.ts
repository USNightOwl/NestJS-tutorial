import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { User } from './entities/user.entity';
import { UserSignInDTO } from './dto/user-signin.dto';

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
}
