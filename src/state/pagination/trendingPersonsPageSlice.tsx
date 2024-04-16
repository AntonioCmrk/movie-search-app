import { createSlice } from "@reduxjs/toolkit";

type trendingPersonsPageState = {
  trendingPersonsPage: number;
};

const initialState: trendingPersonsPageState = {
  trendingPersonsPage: 1,
};

const trendingPersonsPageSlice = createSlice({
  name: "trendingPersonsPage",
  initialState,
  reducers: {
    storeTrendingPersonsPage: (state, action) => {
      state.trendingPersonsPage = action.payload;
    },
  },
});

export default trendingPersonsPageSlice.reducer;
export const { storeTrendingPersonsPage } = trendingPersonsPageSlice.actions;
