import { all, fork } from "redux-saga/effects";
import watchUsersFetch from "./user/user.saga";

export default function* rootSaga() {
  yield all([fork(watchUsersFetch)]);
}
