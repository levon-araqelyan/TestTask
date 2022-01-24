import React, { useEffect } from "react";
import { useHistory } from "react-router";

import styles from "./MusicSearch.module.scss";

import { useActions } from "../../hooks/useActions";
import { getUrlParams } from "../../utils";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import SortForm from "./SortForm";

const MusicSearch = () => {
  const { getMusicWorksAction } = useActions();
  const history = useHistory();
  const params = getUrlParams(history.location.search);

  useEffect(() => {
    getMusicWorksAction({
      requestData: {
        search: params?.value || "",
        skip: Number(params?.page) | 0,
        take: 5,
        sort: [{ field: params?.sort || "creationYear", order: "desc" }],
        refiners: [
          {
            since: params?.since || 1983,
            till: params?.till || 2020,
            type: "DateRange",
            field: params?.sort || "creationYear"
          }
        ]
      }
    });
  }, [
    params?.value,
    params?.sort,
    params?.since,
    params?.page,
    params?.till,
    getMusicWorksAction
  ]);

  return (
    <div className={styles.musicSearch}>
      <SearchInput />
      <SortForm />
      <SearchResult />
    </div>
  );
};

export default MusicSearch;
