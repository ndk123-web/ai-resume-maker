import { createSlice } from "@reduxjs/toolkit";
import { setUserId } from "firebase/analytics";
import { act } from "react";

const initialState = [{
  id: null,
  chat: null,
}];

const userSessionSlice = createSlice({
  name: "user_chat_history",
  initialState,
  reducers: {
    setUserChatHistory: (state, action) => {
      state = action.payload.data;
      return state;
    },
    updateUserChatHistory: (state, action) => {
      state = action.payload.data;
      return state;
    },
    resetUserChatHistory: (state) => {
      state = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    // need thunk here to get the user chat history from api
  },
});

export const {
  setUserChatHistory,
  updateUserChatHistory,
  resetUserChatHistory,
} = userSessionSlice.actions;
export default userSessionSlice.reducer;
