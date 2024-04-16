import { IMG_BASE_URL, getShowTrailer } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import ResponsiveEmbed from "react-responsive-embed";
import { useNavigate } from "react-router-dom";
import { DataTrailerType, GenreType } from "../types/Types";

export const ShowsDetails = () => {
  const navigate = useNavigate();
  const [trailerLink, setTrailerLink] = useState("");
  const [genres] = useState(() => {
    const genres = localStorage.getItem("genres");
    const initialValue = genres ? JSON.parse(genres) : null;
    return initialValue || "";
  });
  const [storedShow] = useState(() => {
    const saved = localStorage.getItem("storedShow");
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || "";
  });
  storedShow ? null : navigate("/");

  const filteredGenres = genres.filter((genre: GenreType) =>
    storedShow.genre_ids.includes(genre.id)
  );
  const filteredGenresNames: string[] = filteredGenres.map(
    (item: GenreType) => item.name
  );

  const { data, isLoading } = useQuery(["trailerData", storedShow.id], () =>
    getShowTrailer(storedShow.id)
  );
  const imgUrl = `${IMG_BASE_URL}${storedShow.poster_path}`;

  let trailerObject = data?.data.results.find((element: DataTrailerType) => {
    return element.type === "Trailer";
  });

  useEffect(() => {
    trailerObject !== undefined
      ? setTrailerLink(`https://www.youtube.com/embed/${trailerObject.key}`)
      : null;
  }, [trailerObject]);
  return (
    <div className=" mx-20 mb-20">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <HeadTitle title={storedShow.title} />
          <div className="flex justify-center align-middle gap-3 mb-20 max-lg:flex-col max-lg:items-center ">
            <div className="min-w-80 flex justify-center items-center">
              <img
                src={
                  imgUrl === "https://image.tmdb.org/t/p/w500null"
                    ? "/image-not-available.png"
                    : imgUrl
                }
                className="w-80 rounded-lg"
                alt="alt"
              />
            </div>
            <div className="flex flex-col justify-center bg-violet-100 rounded-lg [&>div]:bg-violet-200 [&>div]:p-7 gap-14 p-10 text-center [&>div]:rounded-lg max-w-7xl max-sm:bg-transparent">
              <div>Overview: {storedShow.overview}</div>
              <div>Rating: {storedShow.vote_average}</div>

              <span className="flex justify-center [&>div]:bg-violet-200 [&>div]:rounded-lg [&>div]:p-7 [&>div]:mx-10 max-sm:flex-col [&>div]:max-sm:mb-10">
                {filteredGenresNames.map((element: string) => (
                  <div key={element}>{element}</div>
                ))}
              </span>
            </div>
          </div>
          <h1 className="text-xl text-violet-600 font-black text-center">
            Trailer
          </h1>
          {trailerLink === "" ? (
            "Trailer unavailable"
          ) : (
            <ResponsiveEmbed
              src={trailerLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></ResponsiveEmbed>
          )}
        </>
      )}
    </div>
  );
};
