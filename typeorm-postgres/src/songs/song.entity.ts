import { Playlist } from "src/playlists/playlist.entity";
import { Artist } from "../artists/artist.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("songs")
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  // @Column("varchar", { array: true })
  // artists: string[];

  @Column("date")
  releasedDate: Date;

  @Column("time")
  duration: Date;

  @Column("text")
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: "songs_artists" })
  artists: Artist[];

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
