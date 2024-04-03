import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    let user: User;
    try {
      user = await this.userService.findUserByEmail(email);
      if (user && user.password === password) return user;

      if (user === undefined)
        throw new UnauthorizedException('User not found: ' + email);
    } catch (error) {
      throw new UnauthorizedException('User not found: ' + email);
    }
    if (user.password !== password)
      throw new UnauthorizedException('Invalid password');
  }
}
