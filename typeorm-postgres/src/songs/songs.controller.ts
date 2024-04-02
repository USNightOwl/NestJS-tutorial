import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song-dto";
import { Song } from "./song.entity";

@Controller("songs")
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll() {
    try {
      return "hello";
    } catch (error) {
      throw new HttpException(
        "server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
