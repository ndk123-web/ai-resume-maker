import { createSlice } from "@reduxjs/toolkit";
import { fetchUserChatHistory } from "../thunks/fetch_current_user_chat_history.js";

const initialState = {
  loading: false,
  githubLoading: false,
  googleLoading: false,
  pageLoading: false,
  chatLoading: false,
  emailLoading: false,
  chatHistoryLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    unsetloading: (state) => {
      state.loading = false;
    },
    setGithubLoading: (state) => {
      state.githubLoading = true;
    },
    unsetGithubLoading: (state) => {
      state.githubLoading = false;
    },
    setGoogleLoading: (state) => {
      state.googleLoading = true;
    },
    unsetGoogleLoading: (state) => {
      state.googleLoading = false;
    },
    setPageLoading: (state) => {
      state.pageLoading = true;
    },
    unsetPageLoading: (state) => {
      state.pageLoading = false;
    },
    setChatLoading: (state) => {
      state.chatLoading = true;
    },
    unsetChatLoading: (state) => {
      state.chatLoading = false;
    },
    setEmailLoading: (state) => {
      state.emailLoading = true;
    },
    unsetEmailLoading: (state) => {
      state.emailLoading = false;
    },
    setChatHistoryLoading: (state) => {
      state.chatHistoryLoading = true;
    },
    unsetChatHistoryLoading: (state) => {
      state.chatHistoryLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserChatHistory.pending, (state) => {
      state.chatHistoryLoading = true;
    });
    builder.addCase(fetchUserChatHistory.fulfilled, (state) => {
      state.chatHistoryLoading = false;
    });
    builder.addCase(fetchUserChatHistory.rejected, (state) => {
      state.chatHistoryLoading = false;
    });
  },
});

export default loadingSlice.reducer;
export const {
  setLoading,
  unsetloading,
  setGithubLoading,
  unsetGithubLoading,
  setGoogleLoading,
  unsetGoogleLoading,
  setPageLoading,
  unsetPageLoading,
  setChatLoading,
  unsetChatLoading,
  setEmailLoading,
  unsetEmailLoading,
} = loadingSlice.actions;
