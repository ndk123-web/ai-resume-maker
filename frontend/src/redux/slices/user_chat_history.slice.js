import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSessionSlice = createSlice({
  name: "user_chat_history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // need thunk here to get the user chat history from api
  },
});

export default userSessionSlice.reducer;
