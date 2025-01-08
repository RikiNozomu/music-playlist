import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SongService } from 'src/song/song.service';

@Injectable()
export class PlaylistService {
  constructor(
    private prisma: PrismaService,
    private song: SongService,
  ) {}

  async findAll(youtubeId? : string) {
    const playlist = await this.prisma.playList.findMany({ include : {
      Song : {
        where : {
          songId : youtubeId
        }
      }
    }});

    return playlist.map(item => ({
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      title: item.title,
      ...youtubeId ? { hasThisSong : item.Song.length > 0 } : {}
    }))
  }

  async findOne(id: number) {
    const playlist = await this.prisma.playList.findUnique({
      where: { id },
    });
    const songs = await this.prisma.songInPlaylist.findMany({
      where: { playlistId: id },
      select: {
        song: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return playlist ? { ...playlist, songs : songs.map(item => item.song) } : {};
  }

  create(playlist: { title: string }) {
    return this.prisma.playList.create({
      data: playlist,
    });
  }

  update(id: number, playlist: { title: string }) {
    return this.prisma.playList.update({
      where: { id },
      data: playlist,
    });
  }

  delete(id: number) {
    return this.prisma.playList.delete({
      where: { id },
    });
  }

  removeSong(songId: string, playlistId: number) {
    return this.prisma.songInPlaylist.deleteMany({
      where: {
        songId,
        playlistId,
      },
    });
  }

  async addSong(songId: string, playlistID: number) {
    const songDetail = await this.song.getDetailFromYoutubeAPI(songId);
    const song = await this.prisma.song.upsert({
      where: { id: songId },
      update: {
        title: songDetail.title,
        artist: songDetail.author,
        thumbnail: songDetail.thumbnail[0].url
      },
      create: {
        id: songId,
        title: songDetail.title,
        artist: songDetail.author,
        thumbnail: songDetail.thumbnail[0].url
      },
    });

    return await this.prisma.songInPlaylist.upsert({
      where: {
        songId_playlistId: {
          songId,
          playlistId: playlistID
        }
      },
      create: {
        songId,
        playlistId: playlistID
      },
      update: {}
    })

  }
}
