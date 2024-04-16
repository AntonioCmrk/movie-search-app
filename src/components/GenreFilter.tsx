import { useState } from "react";
import { Close, ArrowDown } from "react-ionicons";
import { GenreFilterProps, GenreType } from "../types/Types";

export const GenreFilter = ({
  selectedGenres,
  setSelectedGenres,
}: GenreFilterProps) => {
  const AddRemoveGenreFilter = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(
        selectedGenres.filter((element: number) => element !== id)
      );
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };
  const [genres] = useState(() => {
    const genres = localStorage.getItem("genres");
    const initialValue = genres ? JSON.parse(genres) : null;
    return initialValue || "";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="lg:px-56 text-center md:px-20 px-2">
      <div
        className="flex justify-center cursor-pointer  bg-violet-400 rounded-full p-5 mb-5"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Genre Filters
        {menuOpen ? <Close color="#4C1D95" /> : <ArrowDown color="#4C1D95" />}
      </div>
      <div
        className={`flex justify-around flex-wrap gap-5 [&>*]:min-w-[15%] [&>*]:max-sm:min-w-[40%] [&>*]:max-md:min-w-[22%] ${
          menuOpen ? "" : "hidden"
        }`}
      >
        {genres.map((genre: GenreType) => (
          <div
            key={genre.id}
            className={` rounded-full p-4 hover:bg-violet-600 cursor-pointer ${
              selectedGenres.includes(genre.id)
                ? "bg-violet-700 text-white"
                : "bg-violet-400"
            }`}
            onClick={() => AddRemoveGenreFilter(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};
