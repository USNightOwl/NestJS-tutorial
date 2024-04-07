import { Injectable } from '@nestjs/common';
import { CreateSongInput } from './dto/create-song.input';
import { UpdateSongInput } from './dto/update-song.input';

@Injectable()
export class SongService {
  create(createSongInput: CreateSongInput) {
    return 'This action adds a new song';
  }

  findAll() {
    return `This action returns all song`;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongInput: UpdateSongInput) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
