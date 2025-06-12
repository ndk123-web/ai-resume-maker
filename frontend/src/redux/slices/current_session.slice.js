import { createSlice } from "@reduxjs/toolkit";
import { create } from "framer-motion/client";

const initialState = [];

const currentSessionSlice = createSlice({
  name: "current_session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // need thunk here to get the current session chat from api
  },
});

export default currentSessionSlice.reducer;
