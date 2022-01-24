import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import styles from "./SingleMusic.module.scss";

import { useActions } from "../../hooks/useActions";
import { showLoadingSelector } from "../../store/loading/selectors";
import { musicWorksSelector } from "../../store/musicWorks/selectors";
import Loading from "../shared/Loading";
import RightsChains from "./RightsChains";

const SingleMusic = () => {
  const history = useHistory();
  const params: { id?: string } = useParams();
  const { musicWorks } = useSelector(musicWorksSelector);
  const loading = useSelector(showLoadingSelector);
  const { singleWorks } = musicWorks;

  const { getSingleMusicAction } = useActions();

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if (params?.id) {
      getSingleMusicAction(params?.id);
    }
  }, [params?.id, getSingleMusicAction]);
  return (
    <div className={styles.singleMusic}>
      <button className={styles.backButton} onClick={handleBack}>
        BACK TO SEARCH RESULTS
      </button>
      {loading && <Loading />}
      {singleWorks && !loading && (
        <div>
          <h4>{singleWorks.title}</h4>
          <div>
            {singleWorks.writers.map(writer => (
              <span key={writer}>{writer} / </span>
            ))}
          </div>
          <div className={styles.info}>
            <div>
              <span className={styles.label}>ASSOCIATED ARTIST</span>
              <p className={styles.item}>{singleWorks?.artist}</p>
            </div>
            <div>
              <span className={styles.label}>WW CODE</span>
              <p className={styles.item}>{singleWorks?.code}</p>
            </div>
            <div>
              <span className={styles.label}>ISWC</span>
              {singleWorks.iswc.map(el => (
                <p key={el} className={styles.item}>
                  {el}
                </p>
              ))}
            </div>
            <div>
              <span className={styles.label}>CREATION YEAR</span>
              <p className={styles.item}>{singleWorks?.creationYear}</p>
            </div>
          </div>
          <RightsChains />
        </div>
      )}
    </div>
  );
};

export default SingleMusic;
