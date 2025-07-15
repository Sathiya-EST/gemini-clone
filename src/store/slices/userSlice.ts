"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "username",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
