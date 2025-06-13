import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  bio: null,
  fullname: null,
  isPremium: null,
  avtar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.fullname = action.payload.fullname;
      return state;
    },
    updateUserProfile: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.fullname = action.payload.fullname;
      state.isPremium = action.payload.isPremium;
      state.avtar = action.payload.avtar;
      return state;
    },
    removeUserProfile: (state) => {
      state.username = null;
      state.email = null;
      state.bio = null;
      state.fullname = null;
      state.isPremium = null;
      state.avtar = null;
      return state;
    },
  },
});

export const { setUserProfile, updateUserProfile , removeUserProfile } = userSlice.actions;
export default userSlice.reducer;
