import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  searchModal: false,
  user: null,
  token: null,
  feedThreads: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    refreshUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.user };
    },
    setSearchModal: (state) => {
      state.searchModal = !state.searchModal;
    },
  },
});

export const { setMode, setLogout, setLogin, refreshUser, setSearchModal } =
  authSlice.actions;
export default authSlice.reducer;
