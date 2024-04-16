import { createSlice } from "@reduxjs/toolkit";

type topRatedShowsPageState = {
  topRatedShowsPage: number;
};

const initialState: topRatedShowsPageState = {
  topRatedShowsPage: 1,
};

const topRatedShowsPageSlice = createSlice({
  name: "topRatedShowsPage",
  initialState,
  reducers: {
    storeTopRatedShowsPage: (state, action) => {
      state.topRatedShowsPage = action.payload;
    },
  },
});

export default topRatedShowsPageSlice.reducer;
export const { storeTopRatedShowsPage } = topRatedShowsPageSlice.actions;
