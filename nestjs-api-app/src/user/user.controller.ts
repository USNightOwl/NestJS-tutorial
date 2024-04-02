import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { MyJwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@Request() request) {
    return request.user;
  }
}
