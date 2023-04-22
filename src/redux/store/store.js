import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import wardReducer from "../slices/taskSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    ward: wardReducer,
  },
});
