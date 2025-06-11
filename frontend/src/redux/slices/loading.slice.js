import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
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
  },
});

export default loadingSlice.reducer;
export const { setLoading, unsetloading } = loadingSlice.actions;
