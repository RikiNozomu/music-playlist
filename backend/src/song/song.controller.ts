import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('search')
  async findMany(@Query('keyword') keyword: string) {
    return { data: await this.songService.findMany(keyword) };
  }
  
  @Get(':youtubeId')
  async findOne(@Param('youtubeId') youtubeId: string) {
    return { data: await this.songService.findOneByYoutubeId(youtubeId) };
  }
}
