import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: null,
  },
  reducers: {
    saveOrder: (state, action) => {
      state.orderData = action.payload;
    },
  },
});

export const { saveOrder } = orderSlice.actions;

export default orderSlice.reducer;
