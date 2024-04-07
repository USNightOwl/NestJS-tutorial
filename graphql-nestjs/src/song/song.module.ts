import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongResolver } from './song.resolver';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  providers: [SongResolver, SongService],
  controllers: [SongController],
})
export class SongModule {}
