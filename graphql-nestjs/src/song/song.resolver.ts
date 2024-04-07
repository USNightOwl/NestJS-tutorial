import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SongService } from './song.service';
import { Song } from './entities/song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';
import { CreateSongDTO } from './dto/create-song.dto';
import { GraphQLError } from 'graphql';

@Resolver(() => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Mutation('createSong')
  async createSong(@Args('createSongInput') args: CreateSongDTO) {
    return this.songService.createSong(args);
  }

  @Mutation(() => Song)
  updateSong(
    @Args('updateSongInput') args: UpdateSongDTO,
    @Args('id') id: string,
  ) {
    return this.songService.updateSong(id, args);
  }

  @Mutation(() => Song)
  async deleteSong(@Args('id') id: string) {
    return this.songService.deleteSong(id);
  }

  @Query(() => [Song], { name: 'songs' })
  async getSongs() {
    throw new GraphQLError('Unable to fetch the songs', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
    return this.songService.getSongs();
  }

  @Query(() => Song, { name: 'song' })
  findOne(@Args('id') id: string) {
    return this.songService.getSong(id);
  }
}
