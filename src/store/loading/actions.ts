import { LoadingActions, LoadingActionTypes } from "./types";

const setLoadingAction = (isLoadingShown: boolean): LoadingActions => ({
  type: LoadingActionTypes.SET_LOADING_STATE,
  payload: isLoadingShown
});

export { setLoadingAction };
