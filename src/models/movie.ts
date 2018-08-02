import { ITorrent } from './torrent';

export interface IMovie {
  id: number;
  title: string;
  large_cover_image: string;
  medium_cover_image: string;
  like_count: number;
  title_english: string;
  title_long: string;
  year: number;
  runtime: number;
  description_full: string;
  genres: any[];
  imdb_code: number;
  language: string;
  rating: number;
  slug: string;
  url: string;
  summary: string;
  torrents: ITorrent[];
}
