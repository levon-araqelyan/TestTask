export enum MusicWorksActionTypes {
  GET_SINGLE_MUSIC = "@appSettings/getSingleMusic",
  GET_SINGLE_MUSIC_SUCCESS = "@appSettings/getSingleMusicSuccess",
  GET_MUSIC_WORKS = "@appSettings/getMusicWorks",
  GET_MUSIC_WORKS_SUCCESS = "@appSettings/getMusicWorksSuccess",
  ERROR_MESSAGE = "@appSettings/errorMessage"
}

export type workType = {
  artist: string;
  id: string;
  title: string;
  creationYear: number;
  writers: string[];
};

export type ISingleMusicState = {
  artist: string;
  id: string;
  title: string;
  creationYear: number;
  code: string;
  writers: string[];
  iswc: string[];
  rightsChains: {
    country: string;
    mechTotal: number;
    perfTotal: number;
    syncTotal: number;
    rightsSummaries: {
      isControlled: boolean;
      rightsPartyCreator: {
        name: string;
        signingTerritory: string;
        society: string;
        perfShare: { percentage: number; isControlled: boolean };
        mechShare: { percentage: number; isControlled: boolean };
        syncShare: { percentage: number; isControlled: boolean };
      };
    }[];
  }[];
};

export interface IMusicWorksState {
  readonly musicWorksList: workType[];
  readonly singleWorks?: null | ISingleMusicState;
  readonly total: number;
  readonly error?: string;
}

export interface ISingleMusicActions {
  type: MusicWorksActionTypes.GET_SINGLE_MUSIC;
  payload: { id: string };
}

export interface IErrorMessageAction {
  type: MusicWorksActionTypes.ERROR_MESSAGE;
  payload: string;
}

export interface ISingleMusicSuccessActions {
  type: MusicWorksActionTypes.GET_SINGLE_MUSIC_SUCCESS;
  payload: { id: string };
}

export interface IGetMusicWorks {
  type: MusicWorksActionTypes.GET_MUSIC_WORKS;
  payload: { requestData: { search: string; skip: number; take: number } };
}

export interface IGetMusicWorksSuccess {
  type: MusicWorksActionTypes.GET_MUSIC_WORKS_SUCCESS;
  payload: { musicWorksList: workType[]; total: number };
}

export type IMusicWorksActions =
  | IGetMusicWorks
  | IGetMusicWorksSuccess
  | ISingleMusicSuccessActions
  | IErrorMessageAction;
