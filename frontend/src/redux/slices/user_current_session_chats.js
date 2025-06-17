import { createSlice } from "@reduxjs/toolkit";

const userCurrentSessionChatsSlice = createSlice({
  name: "user_current_session_chats",
  initialState: [],
  reducers: {
    addChats: (state, action) => {
      return action.payload.chats;
    },
  },
});

export const { addChats } = userCurrentSessionChatsSlice.actions;
export default userCurrentSessionChatsSlice.reducer;
