import { all } from "redux-saga/effects";

import { watchMusicWorksSettings } from "./musicWorks/sagas";

export default function* rootSaga(): Generator {
  yield all([watchMusicWorksSettings()]);
}
