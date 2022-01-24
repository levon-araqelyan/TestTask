import { createSelector } from "reselect";

import { IAppState } from "../rootReducer";

const loadingSelector = (state: IAppState) => state.loading;

const showLoadingSelector = createSelector(
  loadingSelector,
  loading => loading.showLoading
);

export { showLoadingSelector };
