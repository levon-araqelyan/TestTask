import { Reducer } from "redux";

import { ILoadingState, LoadingActions, LoadingActionTypes } from "./types";

const initialState: ILoadingState = {
  showLoading: false
};

export const loadingReducer: Reducer<ILoadingState, LoadingActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LoadingActionTypes.SET_LOADING_STATE: {
      const showLoading = action.payload;

      return {
        showLoading
      };
    }
    default:
      return state;
  }
};
