import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchVal: "",
};

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    getsearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
  },
});

export const { getsearchVal } = toursSlice.actions;

export default toursSlice.reducer; // this is imported as toursReducer in store
