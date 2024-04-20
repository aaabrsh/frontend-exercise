import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState, UserState } from "./user.types";

const initialState: IUserState = {
  data: [],
  total: 0,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    usersFetchStart: (state) => {
      state.error = null;
      state.data = [];
      state.total = 0;
      state.isLoading = true;
    },

    usersFetchSuccess: (
      state,
      action: PayloadAction<{ data: UserState[]; total: number }>
    ) => {
      state.error = null;
      state.isLoading = false;
      state.total = action.payload.total;
      state.data = action.payload.data;
    },

    usersFetchError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    addUsers: (state, action: PayloadAction<UserState[]>) => {
      state.data = action.payload;
    },

    removeUsers: (state) => {
      state.data = [];
      state.total = 0;
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
