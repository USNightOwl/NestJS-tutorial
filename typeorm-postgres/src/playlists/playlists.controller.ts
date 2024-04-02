import { Body, Controller, Post } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { CreatePlayListDTO } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.entity";

@Controller("playlists")
export class PlaylistsController {
  constructor(private playListService: PlaylistsService) {}
  @Post()
  create(@Body() playListDTO: CreatePlayListDTO): Promise<Playlist> {
    return this.playListService.create(playListDTO);
  }
}
