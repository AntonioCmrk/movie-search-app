import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";
import trendingMoviesPageReducer from "./pagination/trendingMoviesPageSlice";
import topRatedMoviesPageReducer from "./pagination/topRatedMoviesPageSlice";
import popularShowsPageReducer from "./pagination/popularShowsPageSlice";
import topRatedShowsPageReducer from "./pagination/topRatedShowsPageSlice";
import trendingPersonsPageReducer from "./pagination/trendingPersonsPageSlice";
import searchPageReducer from "./pagination/searchPageSlice";
import modalReducer from "./modal/modalSlice";
import playlistModalReducer from "./modal/playlistModalSlice";
import playlistsReducer from "./playlists/playlistsSlice";
import loginStatusReducer from "./user/loginStatusSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    trendingMoviePage: trendingMoviesPageReducer,
    topRatedMoviesPage: topRatedMoviesPageReducer,
    popularShowsPage: popularShowsPageReducer,
    topRatedShowsPage: topRatedShowsPageReducer,
    trendingPersonsPage: trendingPersonsPageReducer,
    searchPage: searchPageReducer,
    modal: modalReducer,
    playlistModal: playlistModalReducer,
    playlists: playlistsReducer,
    loginStatus: loginStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
