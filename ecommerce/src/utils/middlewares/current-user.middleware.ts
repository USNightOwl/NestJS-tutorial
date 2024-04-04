import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/entities/user.entity';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer ')
    ) {
      req.currentUser = null;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const { id } = <JwtPayload>(
          verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        );
        const currentUser = await this.userService.findOne(+id);
        req.currentUser = currentUser;
      } catch (error) {
        req.currentUser = null;
      }
    }
    next();
  }
}

interface JwtPayload {
  id: string;
}
