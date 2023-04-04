import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  tasks: [],
  status: "idle",
};

export const addTaskAsync = createAsyncThunk(
  "task/addTask",
  async (taskName) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((response) => response.json());
    const titleArray = response.map((todo) => todo.email);
    return [...titleArray, taskName];
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //     addTask: (state, action) => {
    //       state.tasks.push(action.payload);
    //     },
    removeTask: (state, action) => {
      console.log(state);
      const data = state.tasks.filter((email) => {
        return email !== action.payload;
      });
      state.tasks = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks.push(action.payload);
      });
  },
});

export const { removeTask } = taskSlice.actions;
export const selectTask = (state) => state.task;
export default taskSlice.reducer;
