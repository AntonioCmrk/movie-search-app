import axios from "axios";

const API_KEY = "8347850e3b734cd5e23c0671da06d1b7";
const LANGUAGE = "en-US";
const AUTHORIZATION =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzQ3ODUwZTNiNzM0Y2Q1ZTIzYzA2NzFkYTA2ZDFiNyIsInN1YiI6IjY0ODIwOWMxYmYzMWYyMDBhZWM3MGYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F6oYYbb_z2v0UPoM7u3PebvdpHjQ2cVvdbmKeyrJkKI";
const BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_MOVIE = "/trending/movie/day";
const TRENDING_PERSON = "/trending/person/day";
const TOP_RATED = "/movie/top_rated";
const GENRE_LIST = "/genre/movie/list";
const SEARCH_MULTI = "/search/multi";
const TOP_RATED_SHOWS = "/tv/top_rated";
const POPULAR_SHOWS = "/tv/popular";
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const genreOptions = {
  method: "GET",
  url: BASE_URL + GENRE_LIST,
  params: { language: LANGUAGE, api_key: API_KEY },
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZATION,
  },
};

export const getGenres = async () => {
  return axios.request(genreOptions).catch(function (error) {
    console.error(error);
  });
};

export const getTrendingMovies = async (pageNumber: number = 1) => {
  return axios
    .get(
      BASE_URL +
        TRENDING_MOVIE +
        `?api_key=8347850e3b734cd5e23c0671da06d1b7&page=${pageNumber}`
    )
    .catch(function (error) {
      console.error(error);
    });
};

export const getTopRatedMovies = async (pageNumber: number = 1) => {
  return axios
    .get(
      BASE_URL +
        TOP_RATED +
        `?api_key=8347850e3b734cd5e23c0671da06d1b7&page=${pageNumber}`
    )
    .catch(function (error) {
      console.error(error);
    });
};

export const getTrendingShows = async (pageNumber: number = 1) => {
  return axios
    .get(
      BASE_URL +
        POPULAR_SHOWS +
        `?api_key=8347850e3b734cd5e23c0671da06d1b7&page=${pageNumber}`
    )
    .catch(function (error) {
      console.error(error);
    });
};

export const getTopRatedShows = async (pageNumber: number = 1) => {
  return axios
    .get(
      BASE_URL +
        TOP_RATED_SHOWS +
        `?api_key=8347850e3b734cd5e23c0671da06d1b7&page=${pageNumber}`
    )
    .catch(function (error) {
      console.error(error);
    });
};

export const getTrendingPersons = async (pageNumber: number = 1) => {
  return axios
    .get(
      BASE_URL +
        TRENDING_PERSON +
        `?api_key=8347850e3b734cd5e23c0671da06d1b7&page=${pageNumber}`
    )
    .catch(function (error) {
      console.error(error);
    });
};

export const searchMovies = async (
  searchValue: string,
  currentPage: number
) => {
  return axios
    .get(
      BASE_URL +
        SEARCH_MULTI +
        `?api_key=8347850e3b734cd5e23c0671da06d1b7&query=${searchValue}&page=${currentPage}`
    )
    .catch(function (error) {
      console.error(error);
    });
};

export const getMovieTrailer = async (movieId: number) => {
  return axios
    .get(
      BASE_URL +
        `/movie/${movieId}/videos?api_key=8347850e3b734cd5e23c0671da06d1b7`
    )
    .catch(function (error) {
      console.error(error);
    });
};
export const getShowTrailer = async (showId: number) => {
  return axios
    .get(
      BASE_URL + `/tv/${showId}/videos?api_key=8347850e3b734cd5e23c0671da06d1b7`
    )
    .catch(function (error) {
      console.error(error);
    });
};
