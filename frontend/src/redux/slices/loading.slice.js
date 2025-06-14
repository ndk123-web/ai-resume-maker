import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  githubLoading: false,
  googleLoading: false,
  pageLoading: false,
  chatLoading: false,
  emailLoading: false,
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
