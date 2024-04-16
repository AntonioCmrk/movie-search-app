import { createSlice } from "@reduxjs/toolkit";

type trendingMoviesPageState = {
  trendingMoviesPage: number;
};

const initialState: trendingMoviesPageState = {
  trendingMoviesPage: 1,
};

const trendingMoviesPageSlice = createSlice({
  name: "trendingMoviesPage",
  initialState,
  reducers: {
    storeTrendingMoviesPage: (state, action) => {
      state.trendingMoviesPage = action.payload;
    },
  },
});

export default trendingMoviesPageSlice.reducer;
export const { storeTrendingMoviesPage } = trendingMoviesPageSlice.actions;
