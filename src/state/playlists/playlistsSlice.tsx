import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Playlist, PlaylistMovie } from "../../types/Types";
type playlistsState = {
  playlists: Playlist[];
  movies: PlaylistMovie[];
};

const initialState: playlistsState = {
  playlists: [],
  movies: [],
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    addToPlaylist: (state, action) => {
      const playlist = state.playlists.find(
        (playlist: Playlist) => playlist.id === action.payload.id
      );
      state.movies = [
        ...state.movies,
        {
          playlistId: action.payload.id,
          id: uuidv4(),
          movie: action.payload.movie,
        },
      ];
      toast.success(
        `Successfully added ${action.payload.movie.title} to ${playlist?.playlistName}`,
        {
          style: {
            borderRadius: "20px",
            textAlign: "center",
          },
        }
      );
    },

    deleteFromPlaylist: (state, action) => {
      const movie = state.movies.find(
        (movie: PlaylistMovie) => movie.id === action.payload
      );
      const playlist = state.playlists.find(
        (playlist: Playlist) => playlist.id === movie?.playlistId
      );
      state.movies = state.movies.filter(
        (movie: PlaylistMovie) => movie.id !== action.payload
      );
      toast.success(
        `Successfully removed ${movie?.movie.title} from ${playlist?.playlistName}`,
        {
          style: {
            borderRadius: "20px",
            textAlign: "center",
          },
        }
      );
    },
    createNewPlaylist: (state, action) => {
      const playlistId = uuidv4();
      state.playlists = [
        ...state.playlists,
        {
          id: playlistId,
          author: localStorage.getItem("username"),
          playlistName: action.payload.playlistName,
        },
      ];
      state.movies = [
        ...state.movies,
        { playlistId: playlistId, id: uuidv4(), movie: action.payload.movie },
      ];
      toast.success(
        `Successfully added ${action.payload.movie.title} to ${action.payload.playlistName}`,
        {
          style: {
            borderRadius: "20px",
            textAlign: "center",
          },
        }
      );
    },
    deletePlaylist: (state, action) => {
      const playlist = state.playlists.find(
        (playlist: Playlist) => playlist.id === action.payload
      );
      state.playlists = state.playlists.filter(
        (playlist: Playlist) => playlist.id !== action.payload
      );
      state.movies = state.movies.filter(
        (movie: PlaylistMovie) => movie.playlistId !== action.payload
      );
      toast.success(`Successfully deleted ${playlist?.playlistName} playlist`, {
        style: {
          borderRadius: "20px",
          textAlign: "center",
        },
      });
    },
  },
});

export default playlistsSlice.reducer;
export const {
  addToPlaylist,
  deleteFromPlaylist,
  createNewPlaylist,
  deletePlaylist,
} = playlistsSlice.actions;
