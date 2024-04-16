import { IMG_BASE_URL } from "../api/api";
import { KnownFor, PersonCardProps } from "../types/Types";

export const PersonCard = ({ person }: PersonCardProps) => {
  const imgUrl = `${IMG_BASE_URL}${person.profile_path}`;
  let counter = 0;
  return (
    <div className="group relative bg-slate-300 rounded-lg hover:shadow-2xl hover:shadow-violet-200  ">
      <div className="group absolute inset-x-0 bottom-0 p-4 max-h-full  translate-y-full ease-in delay-1000 hidden group-hover:block group-hover:-translate-y-16 z-10 overflow-hidden text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
        <div>Known for:</div>
        {person.known_for.map((known_for: KnownFor) => (
          <div key={person.id + counter++}>• {known_for.title}</div>
        ))}
      </div>
      <img
        src={
          imgUrl === "https://image.tmdb.org/t/p/w500null"
            ? "/image-not-available.png"
            : imgUrl
        }
        className=" w-72 rounded-t-lg group-hover:blur"
        alt="alt"
      />

      <span className=" flex items-center justify-center p-3 max-w-72 flex-wrap text-center">
        {person.name}
      </span>
    </div>
  );
};
