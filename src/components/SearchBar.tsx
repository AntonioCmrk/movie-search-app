import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeSearchValue } from "../state/search/searchSlice";
import { SearchBarProps } from "../types/Types";
import { storeSearchPage } from "../state/pagination/searchPageSlice";

export default function SearchBar({
  searchValue,
  setSearchValue,
}: SearchBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = () => {
    if (searchValue) {
      dispatch(storeSearchPage(1));
      dispatch(storeSearchValue(searchValue));
      navigate("/search");
    }
  };

  return (
    <div className="w-3/4 x-auto mx-10 max-lg:mt-14 max-w-[600px]">
      <div className="relative flex w-full flex-wrap  gap-2 ">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Search"
          onKeyDown={(e) => (e.key === "Enter" ? onSearch() : null)}
        />

        <button
          className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="search-button"
          onClick={() => {
            onSearch();
          }}
        >
          Search
        </button>

        <button
          className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="cancel-button"
          hidden={window.location.pathname !== "/search"}
          onClick={() => {
            navigate("/");
            setSearchValue("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
