import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SongService } from './song.service';
import { Song } from './entities/song.entity';
import { CreateSongInput } from './dto/create-song.input';
import { UpdateSongInput } from './dto/update-song.input';

@Resolver(() => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Mutation(() => Song)
  createSong(@Args('createSongInput') createSongInput: CreateSongInput) {
    return this.songService.create(createSongInput);
  }

  @Query(() => [Song], { name: 'song' })
  findAll() {
    return this.songService.findAll();
  }

  @Query(() => Song, { name: 'song' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.songService.findOne(id);
  }

  @Mutation(() => Song)
  updateSong(@Args('updateSongInput') updateSongInput: UpdateSongInput) {
    return this.songService.update(updateSongInput.id, updateSongInput);
  }

  @Mutation(() => Song)
  deleteSong(@Args('id', { type: () => Int }) id: number) {
    return this.songService.remove(id);
  }
}
