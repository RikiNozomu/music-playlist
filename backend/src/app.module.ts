import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistModule } from './playlist/playlist.module';
import { PrismaModule } from './prisma/prisma.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [PlaylistModule, PrismaModule, SongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
