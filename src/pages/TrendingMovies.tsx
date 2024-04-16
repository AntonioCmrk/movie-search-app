import { MovieCard } from "../components/MovieCard";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { useEffect, useState } from "react";
import { Movie } from "../types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { storeTrendingMoviesPage } from "../state/pagination/trendingMoviesPageSlice";
import { GenreFilter } from "../components/GenreFilter";

export const TrendingMovies = () => {
  const navigate = useNavigate();
  const trendingMoviesPage = useSelector<RootState, number>(
    (state) => state.trendingMoviePage.trendingMoviesPage
  );
  const [currentPage, setCurrentPage] = useState(trendingMoviesPage);
  const [maxPage, setMaxPage] = useState(1);
  const { data: trendingMoviesData, isLoading: trendingMoviesLoading } =
    useQuery(["trendingMovies", currentPage], () =>
      getTrendingMovies(currentPage)
    );
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    setMaxPage(trendingMoviesData?.data.total_pages / 2);
  }, [trendingMoviesData?.data.total_pages]);

  return (
    <div className="w-full">
      <HeadTitle title="Trending Movies" />
      <GenreFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      {trendingMoviesLoading ? <div>Loading...</div> : null}
      {!trendingMoviesLoading && trendingMoviesData === undefined ? (
        <div>Error</div>
      ) : null}
      {!trendingMoviesLoading && trendingMoviesData !== undefined ? (
        <>
          <div className="flex flex-wrap justify-around px-56 max-lg:p-0 [&>*]:max-lg:mx-0">
            {trendingMoviesData?.data.results
              .filter(
                selectedGenres.length
                  ? (item: Movie) =>
                      item.genre_ids.some((genre: number) =>
                        selectedGenres.includes(genre)
                      )
                  : () => trendingMoviesData?.data.results
              )
              .map((trendingMovie: Movie) => (
                <div
                  className="p-7"
                  onClick={() => {
                    localStorage.setItem(
                      "storedMovie",
                      JSON.stringify(trendingMovie)
                    );
                    navigate("/movie-details");
                  }}
                  key={trendingMovie.id}
                >
                  <MovieCard movie={trendingMovie} />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            reduxDispatchFunction={storeTrendingMoviesPage}
          />
        </>
      ) : null}
    </div>
  );
};
