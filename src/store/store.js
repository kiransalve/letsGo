import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import orderReducer from "./order";
import toursReducer from "./tours";
import tourListReducer from "./toursList";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    tours: toursReducer,
    order: orderReducer,
    tourList: tourListReducer,
  },
});

export default store;
