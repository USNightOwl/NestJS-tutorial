import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { User } from './entities/user.entity';
import { UserSignInDTO } from './dto/user-signin.dto';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utils/guards/authorization.guard';
import { Roles } from 'src/utils/common/user-roles.enum';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';

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

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
