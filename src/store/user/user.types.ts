export interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

export type IUserState = {
  data: UserState[];
  isLoading: boolean;
  error: any;
};

// action types
const user = "user";
export const FETCH_USERS_START = `${user}/userFetchStart`;
export const FETCH_USERS_SUCCESS = `${user}/userFetchSuccess`;
export const FETCH_USERS_ERROR = `${user}/userFetchError`;
