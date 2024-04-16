import { useDispatch } from "react-redux";
import { closePlaylistModal } from "../state/modal/playlistModalSlice";
import {
  addToPlaylist,
  createNewPlaylist,
} from "../state/playlists/playlistsSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import { Playlist, PlaylistMovie } from "../types/Types";

export const PlaylistModal = () => {
  const dispatch = useDispatch();
  const [newPlaylistToggle, setNewPlaylistToggle] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [storedMovie] = useState(() => {
    const saved = localStorage.getItem("storedMovie");
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || "";
  });
  const playlists = useSelector<RootState, Playlist[]>(
    (state) => state.playlists.playlists
  );
  const playlistMovies = useSelector<RootState, PlaylistMovie[]>(
    (state) => state.playlists.movies
  );

  const addToPlaylistFiltered = (playlistId: string) => {
    let flag = false;
    playlistMovies.filter((item: PlaylistMovie) => {
      if (item.playlistId === playlistId && item.movie.id === storedMovie.id) {
        flag = true;
      }
    });
    flag
      ? toast("Movie is already in the playlist", {
          style: { borderRadius: "20px" },
        })
      : dispatch(
          addToPlaylist({
            id: playlistId,
            movie: storedMovie,
          })
        );
  };

  return (
    <div
      className="bg-black bg-opacity-75 fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center"
      onClick={() => {
        dispatch(closePlaylistModal());
      }}
    >
      <div
        className="bg-white p-9 rounded-lg relative flex align-middle flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" titleCloseBtn">
          <button
            className="absolute right-2 top-2 rounded-full px-2 hover:bg-violet-600 bg-violet-400 ml-2"
            onClick={() => {
              dispatch(closePlaylistModal());
            }}
          >
            X
          </button>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="m-4 text-3xl text-violet-600 font-black">
              Playlists
            </div>

            {playlists.length > 0 ? (
              playlists.map((playlist: Playlist) =>
                playlist.author === localStorage.getItem("username") ? (
                  <div
                    key={playlist.id}
                    className="relative p-4 bg-slate-200 rounded-lg m-4 min-w-full"
                  >
                    {playlist.playlistName}
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`Add move to ${playlist.playlistName}`}
                      className="rounded-full px-2 hover:bg-violet-600 bg-violet-400 ml-2 absolute right-2"
                      onClick={() => {
                        addToPlaylistFiltered(playlist.id);
                        dispatch(closePlaylistModal());
                      }}
                    >
                      +
                    </button>
                    <Tooltip id="my-tooltip" />
                  </div>
                ) : null
              )
            ) : (
              <div className="p-4">No playlists available</div>
            )}
          </div>
        </div>
        {newPlaylistToggle ? (
          <div className="relative flex flex-col [&>*]:m-3 bg-slate-200 m-4 rounded-md">
            <h1>Playlist name:</h1>
            <input
              placeholder="Playlist name"
              className="border-solid border-black border-2 rounded-2xl p-2"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
            />
            <button
              className={`rounded-2xl p-3  ${
                newPlaylistName === ""
                  ? "bg-gray-300"
                  : "hover:bg-violet-600 bg-violet-400"
              }`}
              onClick={() => {
                setNewPlaylistName("");
                setNewPlaylistToggle(false);
                dispatch(
                  createNewPlaylist({
                    movie: storedMovie,
                    playlistName: newPlaylistName,
                  })
                );
                dispatch(closePlaylistModal());
              }}
              id="new-playlist-btn"
              disabled={newPlaylistName === ""}
              data-tooltip-id="playlsit-name-tooltip"
              data-tooltip-content={
                newPlaylistName === "" ? "Enter playlist name" : ""
              }
            >
              Create new playlist and add movie
            </button>
            <Tooltip id="playlsit-name-tooltip" />
            <button
              className="absolute top-0 right-0 rounded-full px-2 hover:bg-violet-600 bg-violet-400"
              onClick={() => {
                setNewPlaylistToggle(false);
              }}
              id="new-playlist-btn"
            >
              X
            </button>
          </div>
        ) : (
          <button
            className="rounded-2xl p-3 hover:bg-violet-600 bg-violet-400"
            onClick={() => {
              setNewPlaylistToggle(true);
            }}
            id="new-playlist-btn"
          >
            Create new playlist
          </button>
        )}
      </div>
    </div>
  );
};
