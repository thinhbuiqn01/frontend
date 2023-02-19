import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  status: null,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  return authApi.getUser((req, res) => {
    if (res.data.status == 200) {
      res.data.user.json();
    }
  });
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.rejected]: (state) => {
      state.status = "rejected";
    },
    [getUser.fulfilled]: (state, action) => {
      (state.status = "success"), (state.value = action.payload);
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
