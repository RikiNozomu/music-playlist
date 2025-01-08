export type MusicItemType = {
  id: string;
  artist: string;
  thumbnail: string;
  title: string;
  duration: number;
  hasInPlaylist: boolean;
};

export type PlaylistType = {
  id: number;
  title: string;
  hasThisSong: boolean;
  songs: MusicItemType[];
};
