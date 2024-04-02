import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SongsModule } from "./songs/songs.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Song } from "./songs/song.entity";
import { UsersModule } from "./users/users.module";
import { ArtistsModule } from "./artists/artists.module";
import { User } from "./users/user.entity";
import { Artist } from "./artists/artist.entity";
import { PlaylistsModule } from "./playlists/playlists.module";
import { Playlist } from "./playlists/playlist.entity";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "12345",
      database: "spotify-clone",
      entities: [Song, User, Artist, Playlist],
      synchronize: true,
    }),
    SongsModule,
    UsersModule,
    ArtistsModule,
    PlaylistsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log("dbName ", dataSource.driver.database);
  }
}
