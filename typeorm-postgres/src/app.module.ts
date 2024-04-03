import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SongsModule } from "./songs/songs.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UsersModule } from "./users/users.module";
import { ArtistsModule } from "./artists/artists.module";
import { PlaylistsModule } from "./playlists/playlists.module";
import { AuthModule } from "./auth/auth.module";
import { dataSourceOptions } from "db/data-source";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
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
