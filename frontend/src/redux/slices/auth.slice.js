import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {
    username: null,
    email: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload);
      return state;
    },
    logout: (state) => {
      (state.status = false),
        (state.userData = {
          name: null,
          email: null,
        });
      return state;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
