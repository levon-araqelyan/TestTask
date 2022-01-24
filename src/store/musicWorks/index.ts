import { Reducer } from "redux";

import {
  IMusicWorksActions,
  IMusicWorksState,
  MusicWorksActionTypes
} from "./types";

const initialState: IMusicWorksState = {
  musicWorksList: [],
  singleWorks: null,
  total: 0,
  error: ""
};

export const musicWorksReducer: Reducer<any, IMusicWorksActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MusicWorksActionTypes.GET_MUSIC_WORKS_SUCCESS: {
      return {
        ...state,
        musicWorksList: action.payload.musicWorksList,
        total: action.payload.total,
        singleWorks: null
      };
    }
    case MusicWorksActionTypes.GET_SINGLE_MUSIC_SUCCESS: {
      return {
        ...state,
        singleWorks: action.payload
      };
    }
    case MusicWorksActionTypes.ERROR_MESSAGE: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
