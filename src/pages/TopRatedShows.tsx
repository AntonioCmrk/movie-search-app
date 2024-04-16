import { useQuery } from "react-query";
import { getTopRatedShows } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { ShowCard } from "../components/ShowCard";
import { Show } from "../types/Types";
import { storeTopRatedShowsPage } from "../state/pagination/topRatedShowsPageSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { GenreFilter } from "../components/GenreFilter";

export const TopRatedShows = () => {
  const navigate = useNavigate();
  const topRatedShowsPage = useSelector<RootState, number>(
    (state) => state.topRatedShowsPage.topRatedShowsPage
  );
  const [currentPage, setCurrentPage] = useState(topRatedShowsPage);
  const [maxPage, setMaxPage] = useState(1);
  const { data: topRatedShowsData, isLoading: topRatedShowsLoading } = useQuery(
    ["topRatedShows", currentPage],
    () => getTopRatedShows(currentPage)
  );
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  useEffect(() => {
    setMaxPage(topRatedShowsData?.data.total_pages);
  }, [topRatedShowsData?.data.total_pages]);
  return (
    <div className="w-full">
      <HeadTitle title="Top Rated Shows" />
      <GenreFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      {topRatedShowsLoading ? <div>Loading...</div> : null}
      {!topRatedShowsLoading && topRatedShowsData === undefined ? (
        <div>Error</div>
      ) : null}
      {!topRatedShowsLoading && topRatedShowsData !== undefined ? (
        <>
          <div className="flex flex-wrap justify-around px-56 max-lg:p-0 [&>*]:max-lg:mx-0">
            {topRatedShowsData?.data.results
              .filter(
                selectedGenres.length
                  ? (item: Show) =>
                      item.genre_ids.some((genre: number) =>
                        selectedGenres.includes(genre)
                      )
                  : () => topRatedShowsData?.data.results
              )
              .map((topRatedShow: Show) => (
                <div
                  className="p-7 "
                  onClick={() => {
                    localStorage.setItem(
                      "storedShow",
                      JSON.stringify(topRatedShow)
                    );
                    navigate("/show-details");
                  }}
                  key={topRatedShow.id}
                >
                  <ShowCard show={topRatedShow} />
                </div>
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            reduxDispatchFunction={storeTopRatedShowsPage}
          />
        </>
      ) : null}
    </div>
  );
};
