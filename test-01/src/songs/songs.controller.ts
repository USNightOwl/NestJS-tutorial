import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song-dto";
import { Connection } from "src/common/constants/connection";

@Controller({
  path: "songs",
  scope: Scope.REQUEST
})
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject("CONNECTION")
    private connection: Connection
  ) {
    console.log(this.connection);
  }
  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        "server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e
        }
      );
    }
  }

  @Get(":id")
  findOne(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return `fetch song on base id ${typeof id}`;
  }

  @Put(":id")
  update() {
    return "update song by id";
  }

  @Delete(":id")
  delete() {
    return "delete song by id";
  }
}
