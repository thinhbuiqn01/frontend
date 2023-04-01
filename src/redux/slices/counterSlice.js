import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state, action) => {
      console.log(state.value, action.payload);
      state.value.push(action.payload);
    },
    decrement: (state, action) => {
      state.value = state.value.filter((item) => {
        return item !== action.payload;
      });
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
