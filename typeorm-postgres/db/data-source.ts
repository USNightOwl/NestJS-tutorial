import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { Artist } from "../src/artists/artist.entity";
import { Playlist } from "../src/playlists/playlist.entity";
import { Song } from "../src/songs/song.entity";
import { User } from "../src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: "postgres",
      host: configService.get<string>("dbHost"),
      port: configService.get<number>("dbPort"),
      username: configService.get<string>("username"),
      database: configService.get<string>("dbName"),
      password: configService.get<string>("password"),
      entities: ["dist/**/*.entity.{js, ts}"],
      synchronize: false,
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "spotify-clone",
  entities: [User, Playlist, Artist, Song],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
