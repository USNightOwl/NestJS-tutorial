import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Repository } from "typeorm";
import { Song } from "../songs/song.entity";
import { User } from "../users/user.entity";
import { CreatePlayListDTO } from "./dto/create-playlist.dto";

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songsRepo: Repository<Song>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDTO): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    const songs = await this.songsRepo.findByIds(playListDTO.songs);
    playList.songs = songs;

    const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    playList.user = user;

    return this.playListRepo.save(playList);
  }
}
