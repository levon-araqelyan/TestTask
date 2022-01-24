export enum LoadingActionTypes {
  SET_LOADING_STATE = "@loading/setLoadingState"
}

export interface ILoadingState {
  readonly showLoading: boolean;
}

export interface ISetLoading {
  type: LoadingActionTypes.SET_LOADING_STATE;
  payload: boolean;
}

export type LoadingActions = ISetLoading;
