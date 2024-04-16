import { createSlice } from "@reduxjs/toolkit";

type topRatedMoviesPageState = {
  topRatedMoviesPage: number;
};

const initialState: topRatedMoviesPageState = {
  topRatedMoviesPage: 1,
};

const topRatedMoviesPageSlice = createSlice({
  name: "topRatedMoviesPage",
  initialState,
  reducers: {
    storeTopRatedMoviesPage: (state, action) => {
      state.topRatedMoviesPage = action.payload;
    },
  },
});

export default topRatedMoviesPageSlice.reducer;
export const { storeTopRatedMoviesPage } = topRatedMoviesPageSlice.actions;
