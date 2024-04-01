import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          //url: 'postgresql://postgres:12345@localhost:5432/nestjs?schema=public',
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }
}
