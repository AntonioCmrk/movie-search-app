import { useQuery } from "react-query";
import { HeadTitle } from "../components/HeadTitle";
import { HomeCard } from "../components/HomeCard";
import {
  getGenres,
  getTopRatedMovies,
  getTopRatedShows,
  getTrendingMovies,
  getTrendingPersons,
  getTrendingShows,
} from "../api/api";
import { useEffect } from "react";

export const Home = () => {
  const { data: genreData } = useQuery(["genres"], getGenres);

  const { data: trendingMoviesData, isLoading: trendingMoviesLoading } =
    useQuery(["trendingMovies"], () => getTrendingMovies(1));

  const { data: topRatedMoviesData, isLoading: topRatedMoviesLoading } =
    useQuery(["topRatedMovies"], () => getTopRatedMovies(1));

  const { data: trendingShowsData, isLoading: trendingShowsLoading } = useQuery(
    ["trendingShows"],
    () => getTrendingShows(1)
  );

  const { data: topRatedShowsData, isLoading: topRatedShowsLoading } = useQuery(
    ["topRatedShows"],
    () => getTopRatedShows(1)
  );

  const { data: trendingPersonsData, isLoading: trendingPersonsLoading } =
    useQuery(["trendingPersons"], () => getTrendingPersons(1));

  useEffect(() => {
    localStorage.setItem("genres", JSON.stringify(genreData?.data.genres));
  }, [genreData?.data.genres]);

  return (
    <>
      <HeadTitle title="Movie search" />
      {trendingMoviesLoading ||
      topRatedMoviesLoading ||
      trendingShowsLoading ||
      topRatedShowsLoading ||
      trendingPersonsLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-around px-56 [&>*]:mx-24 [&>*]:mb-24 max-lg:p-0 [&>*]:max-lg:mx-0">
            <HomeCard
              path={"/trending-movies"}
              name={"Trending movies"}
              imagePath={trendingMoviesData?.data.results[0].poster_path}
            />
            <HomeCard
              path={"/top-rated-movies"}
              name={"Top rated movies"}
              imagePath={topRatedMoviesData?.data.results[0].poster_path}
            />
            <HomeCard
              path={"/trending-shows"}
              name={"Trending shows"}
              imagePath={trendingShowsData?.data.results[0].poster_path}
            />
            <HomeCard
              path={"/top-rated-shows"}
              name={"Top rated shows"}
              imagePath={topRatedShowsData?.data.results[0].poster_path}
            />
            <HomeCard
              path={"/trending-persons"}
              name={"Trending persons"}
              imagePath={trendingPersonsData?.data.results[0].profile_path}
            />
          </div>
        </>
      )}
    </>
  );
};
