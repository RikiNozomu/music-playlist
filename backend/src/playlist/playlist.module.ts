import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SongModule } from 'src/song/song.module';

@Module({
  imports:[PrismaModule, SongModule],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
