import { useQuery } from "react-query";
import { searchMovies } from "../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { MovieCard } from "../components/MovieCard";
import { PersonCard } from "../components/PersonCard";
import { useNavigate } from "react-router-dom";
import { ShowCard } from "../components/ShowCard";
import { SearchedResult } from "../types/Types";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { storeSearchPage } from "../state/pagination/searchPageSlice";

export const Search = () => {
  const navigate = useNavigate();
  const searchPage = useSelector<RootState, number>(
    (state) => state.searchPage.searchPage
  );
  const [currentPage, setCurrentPage] = useState(searchPage);
  const [maxPage, setMaxPage] = useState(1);
  const searchValue = useSelector<RootState, string>(
    (state) => state.search.searchValue
  );
  useEffect(() => {
    setCurrentPage(searchPage);
  }, [searchValue, searchPage]);
  const { data, isLoading } = useQuery(
    ["searchMovies", searchValue, currentPage],
    () => searchMovies(searchValue, currentPage)
  );

  useEffect(() => {
    setMaxPage(data?.data.total_pages);
  }, [data?.data.total_pages]);
  return (
    <div className="w-full">
      {isLoading ? <div>Loading...</div> : null}
      {!isLoading && data === undefined ? <div>Error</div> : null}
      {!isLoading && data !== undefined ? (
        <>
          <div className="flex flex-wrap justify-around px-56 max-lg:p-0 [&>*]:max-lg:mx-0">
            {data?.data.results.map((searchedResult: SearchedResult) => (
              <div className="p-7 " key={searchedResult.id}>
                {searchedResult.media_type === "person" ? (
                  <PersonCard person={searchedResult} />
                ) : searchedResult.media_type === "tv" ? (
                  <div
                    onClick={() => {
                      localStorage.setItem(
                        "storedShow",
                        JSON.stringify(searchedResult)
                      );
                      navigate("/show-details");
                    }}
                  >
                    <ShowCard show={searchedResult} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      localStorage.setItem(
                        "storedMovie",
                        JSON.stringify(searchedResult)
                      );
                      navigate("/movie-details");
                    }}
                  >
                    <MovieCard movie={searchedResult} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            reduxDispatchFunction={storeSearchPage}
          />
        </>
      ) : null}
    </div>
  );
};
