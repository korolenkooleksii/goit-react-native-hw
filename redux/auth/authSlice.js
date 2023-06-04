import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  userId: null,
  email: null,
  stateChange: false,
  avatar: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile(state, { payload }) {
      state.login = payload.login;
      state.userId = payload.userId;
      state.email = payload.email;
    },
    addUserAvatar(state, {payload}){
      state.avatar = payload.userAvatar;
    },
    authStateChange(state, { payload }) {
      state.stateChange = payload.stateChange;
    },
    authSignOut(state) {
      state.login = null;
      state.userId = null;
      state.email = null;
      state.stateChange = false;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { updateUserProfile, authStateChange, authSignOut, addUserAvatar } =
  authSlice.actions;
