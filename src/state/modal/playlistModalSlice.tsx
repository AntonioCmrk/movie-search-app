import { createSlice } from "@reduxjs/toolkit";

type playlistModalState = {
  isOpen: boolean;
};

const initialState: playlistModalState = {
  isOpen: false,
};

const playlistModalSlice = createSlice({
  name: "playlistModal",
  initialState,
  reducers: {
    openPlaylistModal: (state) => {
      state.isOpen = true;
    },
    closePlaylistModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default playlistModalSlice.reducer;
export const { openPlaylistModal, closePlaylistModal } =
  playlistModalSlice.actions;
