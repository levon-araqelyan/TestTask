import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./SearchResult.module.scss";

import { showLoadingSelector } from "../../../store/loading/selectors";
import { musicWorksSelector } from "../../../store/musicWorks/selectors";
import { workType } from "../../../store/musicWorks/types";
import { getUrlParams } from "../../../utils";
import Loading from "../../shared/Loading";
import PaginationNumbers from "../../shared/PaginationNumbers";

const SearchResult = () => {
  const { musicWorks } = useSelector(musicWorksSelector);
  const loading = useSelector(showLoadingSelector);
  const history = useHistory();
  const params = getUrlParams(history.location.search);
  const { musicWorksList, total } = musicWorks;

  const handleCardClick = useCallback(
    (id: string) => {
      history.push(`/musics/${id}`);
    },
    [history]
  );

  const handleChangePage = useCallback(
    (index: number) => {
      history.push(
        `?page=${index + 1}&value=${params?.value || ""}&sort=${params?.sort ||
          "creationYear"}&since=${params?.since || 1983}&till=${params?.till ||
          2020}`
      );
    },
    [params, history]
  );

  return (
    <div className={styles.searchResult}>
      {loading && <Loading />}
      {!!musicWorksList.length &&
        !loading &&
        musicWorksList.map((item: workType) => (
          <button
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            className={styles.card}
          >
            <div className={styles.name}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.artist}>{item.artist}</span>
            </div>
            <div>
              {item.writers.map(writer => (
                <span key={writer}>{writer} / </span>
              ))}
            </div>
          </button>
        ))}
      {!!musicWorksList.length && !loading && (
        <PaginationNumbers
          totalAmount={Math.ceil(total / 5)}
          currentPage={Number(params?.page) || 1}
          changePageRequest={handleChangePage}
        />
      )}
    </div>
  );
};

export default SearchResult;
