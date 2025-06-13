import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {
    username: null,
    email: null,
  },
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData['username'] = action.payload.username;
      state.userData['email'] = action.payload.email;
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.status = false;
      state.userData = {
        username: null,
        email: null,
      };
      state.isAuthChecked = false;
    },
    markAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export const { login, logout, markAuthChecked } = authSlice.actions;
export default authSlice.reducer;
