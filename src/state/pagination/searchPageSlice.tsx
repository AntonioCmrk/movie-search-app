import { createSlice } from "@reduxjs/toolkit";

type searchPageState = {
  searchPage: number;
};

const initialState: searchPageState = {
  searchPage: 1,
};

const searchPageSlice = createSlice({
  name: "searchPage",
  initialState,
  reducers: {
    storeSearchPage: (state, action) => {
      state.searchPage = action.payload;
    },
  },
});

export default searchPageSlice.reducer;
export const { storeSearchPage } = searchPageSlice.actions;
