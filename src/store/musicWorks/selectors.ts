import { createSelector } from "reselect";

import { IAppState } from "../rootReducer";

const musicWorksListSelector = (state: IAppState) => state;

const musicWorksSelector = createSelector(
  musicWorksListSelector,
  musicWorks => musicWorks
);

export { musicWorksSelector };
