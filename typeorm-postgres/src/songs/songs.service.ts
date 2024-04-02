import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "./song.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateSongDTO } from "./dto/create-song-dto";
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from "nestjs-typeorm-paginate";
import { UpdateSongDTO } from "./dto/update-song-dto";
import { Artist } from "../artists/artist.entity";

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    const artists = await this.artistsRepository.findByIds(songDTO.artists);
    song.artists = artists;

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder("c");
    queryBuilder.orderBy("c.releasedDate", "DESC");

    return paginate<Song>(queryBuilder, options);
  }
}
