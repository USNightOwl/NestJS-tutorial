import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongResolver } from './song.resolver';
import { SongController } from './song.controller';

@Module({
  providers: [SongResolver, SongService],
  controllers: [SongController],
})
export class SongModule {}
