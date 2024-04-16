import { useQuery } from "react-query";
import { getTrendingPersons } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { PersonCard } from "../components/PersonCard";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { Person } from "../types/Types";
import { storeTrendingPersonsPage } from "../state/pagination/trendingPersonsPageSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export const TrendingPersons = () => {
  const trendingPersonsPage = useSelector<RootState, number>(
    (state) => state.trendingPersonsPage.trendingPersonsPage
  );
  const [currentPage, setCurrentPage] = useState(trendingPersonsPage);
  const [maxPage, setMaxPage] = useState(1);
  const { data: trendingPersonsData, isLoading: trendingPersonsLoading } =
    useQuery(["trendingPersons", currentPage], () =>
      getTrendingPersons(currentPage)
    );
  useEffect(() => {
    setMaxPage(trendingPersonsData?.data.total_pages / 2);
  }, [trendingPersonsData?.data.total_pages]);
  return (
    <div className="w-full">
      <HeadTitle title="Trending Persons" />
      {trendingPersonsLoading ? <div>Loading...</div> : null}
      {!trendingPersonsLoading && trendingPersonsData === undefined ? (
        <div>Error</div>
      ) : null}
      {!trendingPersonsLoading && trendingPersonsData !== undefined ? (
        <>
          <div className="flex flex-wrap justify-around px-56 max-lg:p-0 [&>*]:max-lg:mx-0">
            {trendingPersonsData?.data.results.map((trendingPerson: Person) => (
              <div className="p-7 " key={trendingPerson.id}>
                <PersonCard person={trendingPerson} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            reduxDispatchFunction={storeTrendingPersonsPage}
          />
        </>
      ) : null}
    </div>
  );
};
