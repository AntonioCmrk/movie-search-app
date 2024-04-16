import { IMG_BASE_URL, getMovieTrailer } from "../api/api";
import { HeadTitle } from "../components/HeadTitle";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import ResponsiveEmbed from "react-responsive-embed";
import { useNavigate } from "react-router-dom";
import { DataTrailerType, GenreType } from "../types/Types";
import { openPlaylistModal } from "../state/modal/playlistModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trailerLink, setTrailerLink] = useState("");
  const [genres] = useState(() => {
    const genres = localStorage.getItem("genres");
    const initialValue = genres ? JSON.parse(genres) : null;
    return initialValue || "";
  });
  const [storedMovie] = useState(() => {
    const saved = localStorage.getItem("storedMovie");
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || "";
  });
  storedMovie ? null : navigate("/");

  const isLogedIn = useSelector<RootState, boolean>(
    (state) => state.loginStatus.isLogedIn
  );
  console.log(isLogedIn);
  const filteredGenres = genres.filter((genre: GenreType) =>
    storedMovie.genre_ids.includes(genre.id)
  );
  const filteredGenresNames: string[] = filteredGenres.map(
    (item: GenreType) => item.name
  );
  const { data, isLoading } = useQuery(["trailerData", storedMovie.id], () =>
    getMovieTrailer(storedMovie.id)
  );

  const imgUrl = `${IMG_BASE_URL}${storedMovie.poster_path}`;

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
          <div className="flex flex-col justify-center align-middle items-center">
            <HeadTitle title={storedMovie.title} />
            <button
              className={`max-w-56 mb-16 z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 ${
                localStorage.getItem("username") ? "" : "hidden"
              }`}
              type="button"
              id="add-to-playlist-button"
              onClick={() => {
                dispatch(openPlaylistModal());
              }}
            >
              Add to playlist
            </button>
          </div>
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
              <div>Overview: {storedMovie.overview}</div>
              <div>Rating: {storedMovie.vote_average}</div>

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
