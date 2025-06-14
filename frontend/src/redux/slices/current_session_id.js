import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSessionId: null,
};

const currentSessionIdSlice = createSlice({
  name: "currentSessionId",
  initialState,
  reducers: {
    setCurrentSessionId: (state, action) => {
      state.currentSessionId = action.payload;
    },
    resetCurrentSessionId: (state) => {
      state.currentSessionId = null;
    },
    updateCurrentSessionId: (state, action) => {
      state.currentSessionId = action.payload.currentSessionId;
    },
  },
});

export const {
  setCurrentSessionId,
  resetCurrentSessionId,
  updateCurrentSessionId,
} = currentSessionIdSlice.actions;
export default currentSessionIdSlice.reducer;
