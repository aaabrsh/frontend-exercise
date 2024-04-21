import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./auth.types";
import { LoginData } from "../../type/interfaces";
import { UserState } from "../user/user.types";

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginStart: (state, action: PayloadAction<LoginData>) => {
      state.user = null;
      state.error = null;
      state.isLoading = true;
    },

    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },

    loginError: (state, action: PayloadAction<any>) => {
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginError } = authSlice.actions;

export const authReducer = authSlice.reducer;
