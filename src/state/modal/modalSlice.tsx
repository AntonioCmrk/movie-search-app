import { createSlice } from "@reduxjs/toolkit";

type modalState = {
  isOpen: boolean;
};

const initialState: modalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
