import { useDispatch } from "react-redux";
import { PaginationProps } from "../types/Types";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  maxPage,
  reduxDispatchFunction,
}: PaginationProps) => {
  const dispatch = useDispatch();
  const paginationNumbers = [];
  for (let i = 1; i <= maxPage; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="flex justify-center p-10 gap-6 flex-wrap">
      {maxPage < 16 ? (
        paginationNumbers.map((pageNumber: number) => (
          <button
            className={`w-14 h-14 rounded-md hover:bg-violet-700 ${
              currentPage == pageNumber ? "bg-violet-500" : "bg-violet-300"
            }`}
            key={pageNumber}
            onClick={() => {
              dispatch(reduxDispatchFunction(pageNumber));
              setCurrentPage(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        ))
      ) : (
        <>
          {currentPage >= 5 ? (
            <>
              <button
                className={`w-14 h-14 rounded-md hover:bg-violet-700 ${
                  currentPage == 1 ? "bg-violet-500" : "bg-violet-300"
                }`}
                key={1}
                onClick={() => {
                  dispatch(reduxDispatchFunction(1));
                  setCurrentPage(1);
                }}
              >
                {1}
              </button>
              {currentPage === 5 ? null : (
                <div className="my-auto h-9 cursor-default">...</div>
              )}
            </>
          ) : null}
          {paginationNumbers.map((pageNumber: number) =>
            pageNumber <= currentPage + 3 && pageNumber >= currentPage - 3 ? (
              <button
                className={`w-14 h-14 rounded-md hover:bg-violet-700 ${
                  currentPage == pageNumber ? "bg-violet-500" : "bg-violet-300"
                }`}
                key={pageNumber}
                onClick={() => {
                  dispatch(reduxDispatchFunction(pageNumber));
                  setCurrentPage(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            ) : null
          )}
          {currentPage <= maxPage - 4 ? (
            <>
              {currentPage === maxPage - 4 ? null : (
                <div className="my-auto h-9 cursor-default">...</div>
              )}
              <button
                className={`w-14 h-14 rounded-md hover:bg-violet-700 ${
                  currentPage == maxPage ? "bg-violet-500" : "bg-violet-300"
                }`}
                key={maxPage}
                onClick={() => {
                  dispatch(reduxDispatchFunction(maxPage));
                  setCurrentPage(maxPage);
                }}
              >
                {maxPage}
              </button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};
