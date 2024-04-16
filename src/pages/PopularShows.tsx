import { useQuery } from "react-query";
import { getTrendingShows } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { ShowCard } from "../components/ShowCard";
import { Show } from "../types/Types";
import { storePopularShowsPage } from "../state/pagination/popularShowsPageSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { GenreFilter } from "../components/GenreFilter";

export const PopularShows = () => {
  const navigate = useNavigate();
  const popularShowsPage = useSelector<RootState, number>(
    (state) => state.popularShowsPage.popularShowsPage
  );
  const [currentPage, setCurrentPage] = useState(popularShowsPage);
  const [maxPage, setMaxPage] = useState(1);
  const { data: trendingShowsData, isLoading: trendingShowsLoading } = useQuery(
    ["trendingShows", currentPage],
    () => getTrendingShows(currentPage)
  );
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  useEffect(() => {
    setMaxPage(trendingShowsData?.data.total_pages);
  }, [trendingShowsData?.data.total_pages]);
  return (
    <div className="w-full">
      <HeadTitle title="Trending Shows" />
      <GenreFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      {trendingShowsLoading ? <div>Loading...</div> : null}
      {!trendingShowsLoading && trendingShowsData === undefined ? (
        <div>Error</div>
      ) : null}
      {!trendingShowsLoading && trendingShowsData !== undefined ? (
        <>
          <div className="flex flex-wrap justify-around px-56 max-lg:p-0 [&>*]:max-lg:mx-0">
            {trendingShowsData?.data.results
              .filter(
                selectedGenres.length
                  ? (item: Show) =>
                      item.genre_ids.some((genre: number) =>
                        selectedGenres.includes(genre)
                      )
                  : () => trendingShowsData?.data.results
              )
              .map((trendingShow: Show) => (
                <div
                  className="p-7 "
                  onClick={() => {
                    localStorage.setItem(
                      "storedShow",
                      JSON.stringify(trendingShow)
                    );
                    navigate("/show-details");
                  }}
                  key={trendingShow.id}
                >
                  <ShowCard show={trendingShow} />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            reduxDispatchFunction={storePopularShowsPage}
          />
        </>
      ) : null}
    </div>
  );
};
