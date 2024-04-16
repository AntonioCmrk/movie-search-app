import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type HomeCardProps = { path: string; name: string; imagePath: string };

export type ShowCardProps = { show: Show };

export type Show = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type MovieCardProps = { movie: Movie };

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type HeadTitleProps = { title: string };

export type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
  reduxDispatchFunction: ActionCreatorWithPayload<number, string>;
};

export type PersonCardProps = { person: Person };

export type Person = {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: KnownFor[];
};

export type KnownFor = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchBarProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export type SearchedResult = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: KnownFor[];
  video: boolean;
  release_date: string;
  title: string;
  original_title: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type DataTrailerType = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
};

export type GenreFilterProps = {
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
};

export type PlaylistMovie = {
  playlistId: string;
  id: string;
  movie: Movie;
};
export type Playlist = {
  author: string | null;
  id: string;
  playlistName: string;
};
