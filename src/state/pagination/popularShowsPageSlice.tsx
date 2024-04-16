import { createSlice } from "@reduxjs/toolkit";

type popularShowsPageState = {
  popularShowsPage: number;
};

const initialState: popularShowsPageState = {
  popularShowsPage: 1,
};

const popularShowsPageSlice = createSlice({
  name: "popularShowsPage",
  initialState,
  reducers: {
    storePopularShowsPage: (state, action) => {
      state.popularShowsPage = action.payload;
    },
  },
});

export default popularShowsPageSlice.reducer;
export const { storePopularShowsPage } = popularShowsPageSlice.actions;
