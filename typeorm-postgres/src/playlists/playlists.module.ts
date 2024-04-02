import { Module } from "@nestjs/common";
import { PlaylistsController } from "./playlists.controller";
import { PlaylistsService } from "./playlists.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Song } from "../songs/song.entity";
import { User } from "../users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
