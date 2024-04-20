import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USERS_ERROR,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
} from "./user.types";
import { get } from "../../api/crud";

function* workUsersFetch(): any {
  try {
    const response = yield call(() => get("/fetch/dummy/user-v2"));
    yield put({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (e) {
    yield put({ type: FETCH_USERS_ERROR, payload: { error: e } });
  }
}

function* watchUsersFetch() {
  yield takeLatest(FETCH_USERS_START, workUsersFetch);
}

export default watchUsersFetch;
