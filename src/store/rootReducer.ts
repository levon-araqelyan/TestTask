import { combineReducers } from "redux";

import { loadingReducer } from "./loading";
import { ILoadingState } from "./loading/types";
import { musicWorksReducer } from "./musicWorks";
import { IMusicWorksState } from "./musicWorks/types";

export interface IAppState {
  loading: ILoadingState;
  musicWorks: IMusicWorksState;
}

const rootReducer = combineReducers({
  loading: loadingReducer,
  musicWorks: musicWorksReducer
});

export default rootReducer;
