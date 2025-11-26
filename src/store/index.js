import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
  },
});

export default store;