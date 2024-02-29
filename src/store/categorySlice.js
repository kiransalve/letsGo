import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLink: "Nature",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
});

export const { getActiveLink } = categorySlice.actions;

export default categorySlice.reducer; // this is imported as categoryReducer in store
