import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
