import { Controller, Get, Post, Body } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dto/create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDTO) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Get()
  find() {
    return this.albumsService.findAlbums();
  }
}
