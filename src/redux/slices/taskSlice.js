import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient from "../../api/axiosClient";
const initialState = {
  wards: [],
  status: "idle",
};

export const getWardAsync = createAsyncThunk("ward/getWardAsync", async () => {
  const response = await axiosClient.get("address/ward/local").then((res) => {
    return res.data.ward;
  });
  const wardLocal = response.map((ward) => {
    return {
      name: ward._name,
      id: ward.id,
    };
  });

  return wardLocal;
});

export const addWardAsync = createAsyncThunk(
  "ward/addWardAsync",
  async (ward) => { 
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ward);
      }, 1000);
    });
    response.then((ward) => {
      return ward;
    });
    return response;
  }
);

export const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {
    addWard: (state, action) => {
      console.log(action);
      state.wards.push({
        id: state.wards.length,
        name: action.payload,
      });
    },
    removeWard: (state, action) => {
      const data = state.wards.filter((ward) => {
        return ward.name !== action.payload;
      });
      state.wards = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWardAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.wards = [...action.payload];
      })
      .addCase(addWardAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addWardAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.wards.push({
          name: action.payload,
          id: state.wards.length,
        });
      });
  },
});

export const { removeWard, addWard } = wardSlice.actions;
export default wardSlice.reducer;
