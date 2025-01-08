import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Innertube } from 'youtubei.js';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}
  async findOneByYoutubeId(id: string) {
    return await this.prisma.song.findUnique({
      where: { id },
      include: { playlists: true },
    });
  }

  async getDetailFromYoutubeAPI(id: string) {
    const innertube = await Innertube.create();
    const info = await innertube.music.getInfo(id);
    return info.basic_info;
  }

  async findMany(keyword: string) {
    const innertube = await Innertube.create();
    const searchResult = await innertube.music?.search(keyword || '', {
      type: 'song',
    });
    const songs = searchResult.songs?.contents.map((item) => ({
      id: item.id,
      artist: item.artists?.map((item) => item.name).join(', '),
      thumbnail: item.thumbnails.at(0)?.url,
      title: item.title,
      duration: item.duration?.seconds,
    }));
    if (!songs.length) {
      return [];
    }
    const getInPlaylistOnly = await this.prisma.songInPlaylist.findMany({
      select: {
        songId: true,
      },
      distinct: ['songId'],
      where: {
        songId: { in: songs.map((item) => item.id) },
      },
    });
    return songs.map(item => ({...item, hasInPlaylist : getInPlaylistOnly.map(item => item.songId).includes(item.id || "")}))
  }
}
