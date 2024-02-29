import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchToursList = createAsyncThunk(
  "toursList/fetchTourslist",
  async () => {
    try {
      const response = await fetch("api/menu-items");
      if (response.ok) {
        const menu = await response.json();
        return menu;
      } else {
        throw new Error("Error fetching tour list");
      }
    } catch (error) {
      throw new Error(`Error while fetching tour ${error.message}`);
    }
  }
);

const tourListSlice = createSlice({
  name: "tourList",
  initialState: {
    tourItem: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToursList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToursList.fulfilled, (state, action) => {
        state.loading = false;
        state.tourItem = action.payload;
      })
      .addCase(fetchToursList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tourListSlice.reducer;
