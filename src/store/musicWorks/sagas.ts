import { call, put, takeLatest } from "redux-saga/effects";

import { request } from "../../services/requestService";
import { setLoadingAction } from "../loading/actions";
import {
  getMusicWorksSuccessAction,
  getSingleMusicSuccessAction,
  setErrorAction
} from "./actions";
import { MusicWorksActionTypes } from "./types";

export function* getMusicWorksAsync({
  payload
}: {
  type: string;
  payload: { requestData: { search: string; skip: number; take: number } };
}): Generator<any, any, any> {
  try {
    yield put(setLoadingAction(true));
    const { data } = yield call(request, "POST", `works/search`, {
      ...payload.requestData
    });
    const { total, results } = data;
    yield put(getMusicWorksSuccessAction({ total, musicWorksList: results }));
  } catch (error) {
    const newError: any = error;
    yield put(setErrorAction(newError.response.data.message));
  } finally {
    yield put(setLoadingAction(false));
  }
}

export function* getSingleMusicAsync({
  payload
}: {
  type: string;
  payload: { id: string };
}): Generator<any, any, any> {
  try {
    yield put(setLoadingAction(true));
    const { data } = yield call(request, "GET", `/works/${payload.id}`);
    yield put(getSingleMusicSuccessAction(data));
  } catch (error) {
    const newError: any = error;
    yield put(setErrorAction(newError.response.data.message));
  } finally {
    yield put(setLoadingAction(false));
  }
}

function* watchMusicWorksSettings(): Generator {
  yield takeLatest(MusicWorksActionTypes.GET_MUSIC_WORKS, getMusicWorksAsync);
  yield takeLatest(MusicWorksActionTypes.GET_SINGLE_MUSIC, getSingleMusicAsync);
}

export { watchMusicWorksSettings };
