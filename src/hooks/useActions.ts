import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getMusicWorksAction,
  getSingleMusicAction
} from "../store/musicWorks/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          getMusicWorksAction,
          getSingleMusicAction
        },
        dispatch
      ),
    [dispatch]
  );
};
