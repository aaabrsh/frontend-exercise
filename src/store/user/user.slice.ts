import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState, UserState } from "./user.types";

const initialState: IUserState = { data: [], isLoading: false, error: null };

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    usersFetchStart: (state) => {
      state.error = null;
      state.data = [];
      state.isLoading = true;
    },

    usersFetchSuccess: (state, action: PayloadAction<UserState[]>) => {
      state.error = null;
      state.isLoading = false;
      userSlice.caseReducers.addUsers(state, action);
    },

    usersFetchError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.data = [];
      state.isLoading = false;
    },

    addUsers: (state, action: PayloadAction<UserState[]>) => {
      state.data = action.payload;
    },

    removeUsers: (state) => {
      state.data = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  usersFetchStart,
  usersFetchSuccess,
  usersFetchError,
  addUsers,
  removeUsers,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
