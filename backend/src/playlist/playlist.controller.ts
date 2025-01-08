import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('')
  async findAll(@Query('youtubeId') youtubeId?:string) {
    return { data: await this.playlistService.findAll(youtubeId) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.playlistService.findOne(parseInt(id) || -1) };
  }

  @Post('')
  async create(@Body('') playlist: { title: string }) {
    return { data: await this.playlistService.create(playlist) };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() playlist: { title: string }) {
    return {
      data: await this.playlistService.update(parseInt(id) || -1, playlist),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return { data: await this.playlistService.delete(parseInt(id) || -1) };
  }

  // Song in Playlist
  @Post(':id/add')
  async addSong(@Param('id') id: string, @Body() song: { id : string }) {
    return {
      data: await this.playlistService.addSong(song.id, parseInt(id) || -1),
    };
  }

  @Delete(':id/remove/:songId')
  async removeSong(@Param('id') id: string, @Param('songId') songId: string) {
    return {
      data: await this.playlistService.removeSong(
        songId,
        parseInt(id) || -1,
      ),
    };
  }
}
