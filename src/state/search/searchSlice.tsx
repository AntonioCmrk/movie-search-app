import { createSlice } from "@reduxjs/toolkit";

type searchState = {
  searchValue: string;
};

const initialState: searchState = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { storeSearchValue } = searchSlice.actions;
