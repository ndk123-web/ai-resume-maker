import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserChatHistory } from "../../api/getUserChatHistory.js";
import { setUserChatHistory } from "../slices/user_chat_history.slice.js";

const fetchUserChatHistory = createAsyncThunk(
  "loading/fetchUserChatHistory",
  async ({ token }, { dispatch }) => {
    try {
      const backendResponse = await getUserChatHistory({ token });

      if (backendResponse.status !== 200 && backendResponse.status !== 201) {
        alert(backendResponse.message);
        return;
      }

      return backendResponse.data;
    } catch (err) {
      alert(err.message);
    }
  }
);

export { fetchUserChatHistory };
