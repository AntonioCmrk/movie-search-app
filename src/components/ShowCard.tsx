import { IMG_BASE_URL } from "../api/api";
import { ShowCardProps } from "../types/Types";

export const ShowCard = ({ show }: ShowCardProps) => {
  const imgUrl = `${IMG_BASE_URL}${show.poster_path}`;
  return (
    <div className="group relative bg-slate-300 rounded-lg cursor-pointer hover:shadow-2xl hover:shadow-violet-200  ">
      <div className="group absolute inset-x-0 bottom-0 p-4 max-h-full  translate-y-full ease-in delay-1000 hidden group-hover:block group-hover:-translate-y-16 z-10 overflow-hidden text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
        <div className="mb-5">
          {show.overview.length > 400
            ? show.overview.substring(0, 400) + "..."
            : show.overview}
        </div>
        <div>Rating: {show.vote_average.toFixed(1)}</div>
      </div>
      <img
        src={
          imgUrl === "https://image.tmdb.org/t/p/w500null"
            ? "/image-not-available.png"
            : imgUrl
        }
        className="w-72 rounded-t-lg group-hover:blur"
        alt="alt"
      />

      <span className=" flex items-center justify-center p-3 max-w-72 flex-wrap text-center">
        {show.name}
      </span>
    </div>
  );
};
