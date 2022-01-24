import {
  IErrorMessageAction,
  IMusicWorksActions,
  IMusicWorksState,
  ISingleMusicActions,
  ISingleMusicState,
  ISingleMusicSuccessActions,
  MusicWorksActionTypes
} from "./types";

const getSingleMusicAction = (id: string): ISingleMusicActions => ({
  type: MusicWorksActionTypes.GET_SINGLE_MUSIC,
  payload: { id }
});

const getSingleMusicSuccessAction = (
  data: ISingleMusicState
): ISingleMusicSuccessActions => ({
  type: MusicWorksActionTypes.GET_SINGLE_MUSIC_SUCCESS,
  payload: data
});

const getMusicWorksAction = (requestData: {
  requestData: {
    search: string;
    skip: number;
    take: number;
    sort: { field: string; order: string }[];
    refiners: { field: string; since: number; till: number; type: string }[];
  };
}): IMusicWorksActions => ({
  type: MusicWorksActionTypes.GET_MUSIC_WORKS,
  payload: requestData
});

const getMusicWorksSuccessAction = (
  data: IMusicWorksState
): IMusicWorksActions => ({
  type: MusicWorksActionTypes.GET_MUSIC_WORKS_SUCCESS,
  payload: data
});

const setErrorAction = (errorMessage: string): IErrorMessageAction => ({
  type: MusicWorksActionTypes.ERROR_MESSAGE,
  payload: errorMessage
});

export {
  getMusicWorksAction,
  getMusicWorksSuccessAction,
  getSingleMusicAction,
  getSingleMusicSuccessAction,
  setErrorAction
};
