import { createSlice } from "@reduxjs/toolkit";

type loginStatusState = {
  isLogedIn: boolean;
  username: string | null;
};

const initialState: loginStatusState = {
  isLogedIn: localStorage.getItem("username") ? true : false,
  username: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "",
};

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLogedIn = true;
      state.username = action.payload;
    },
    logOut: (state) => {
      state.isLogedIn = false;
      state.username = "";
    },
  },
});

export default loginStatusSlice.reducer;
export const { logIn, logOut } = loginStatusSlice.actions;
