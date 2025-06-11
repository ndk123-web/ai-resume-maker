import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  bio: null,
  fullname: null,
  isPremium: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.fullname = action.payload.fullname;
      return state;
    },
  },
});

export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
