import { UserState } from "../user/user.types";

export interface IAuthState {
  user: UserState | null;
  isLoading: boolean;
  error: any;
}

// action types
const auth = "auth";
export const USER_LOGIN_START = `${auth}/loginStart`;
export const USER_LOGIN_SUCCESS = `${auth}/loginSuccess`;
export const USER_LOGIN_ERROR = `${auth}/loginError`;
