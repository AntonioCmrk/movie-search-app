import { useQuery } from "react-query";
import { getTopRatedMovies } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { MovieCard } from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { Movie } from "../types/Types";
import { storeTopRatedMoviesPage } from "../state/pagination/topRatedMoviesPageSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { GenreFilter } from "../components/GenreFilter";

export const TopRatedMovies = () => {
  const navigate = useNavigate();
  const topRatedMoviesPage = useSelector<RootState, number>(
    (state) => state.topRatedMoviesPage.topRatedMoviesPage
  );
  const [currentPage, setCurrentPage] = useState(topRatedMoviesPage);
  const [maxPage, setMaxPage] = useState(1);
  const { data: topRatedMoviesData, isLoading: topRatedMoviesLoading } =
    useQuery(["topRatedMovies", currentPage], () =>
      getTopRatedMovies(currentPage)
    );
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  useEffect(() => {
    setMaxPage(topRatedMoviesData?.data.total_pages);
  }, [topRatedMoviesData?.data.total_pages]);

  return (
    <div className="w-full">
      <HeadTitle title="Top Rated Movies" />
      <GenreFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      {topRatedMoviesLoading ? <div>Loading...</div> : null}
      {!topRatedMoviesLoading && topRatedMoviesData === undefined ? (
        <div>Error</div>
      ) : null}
      {!topRatedMoviesLoading && topRatedMoviesData !== undefined ? (
        <>
          <div className="flex flex-wrap justify-around px-56 max-lg:p-0 [&>*]:max-lg:mx-0">
            {topRatedMoviesData?.data.results
              .filter(
                selectedGenres.length
                  ? (item: Movie) =>
                      item.genre_ids.some((genre: number) =>
                        selectedGenres.includes(genre)
                      )
                  : () => topRatedMoviesData?.data.results
              )
              .map((topRatedMovie: Movie) => (
                <div
                  className="p-7 "
                  onClick={() => {
                    localStorage.setItem(
                      "storedMovie",
                      JSON.stringify(topRatedMovie)
                    );
                    navigate("/movie-details");
                  }}
                  key={topRatedMovie.id}
                >
                  <MovieCard movie={topRatedMovie} />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            reduxDispatchFunction={storeTopRatedMoviesPage}
          />
        </>
      ) : null}
    </div>
  );
};
