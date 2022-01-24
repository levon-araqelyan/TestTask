import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./RightsChains.module.scss";

import { musicWorksSelector } from "../../../store/musicWorks/selectors";
import CircleProgress from "../../shared/CircleProgress/CircleProgress";
import UiSelect from "../../shared/UiSelect";

const RightsChains = () => {
  const { musicWorks } = useSelector(musicWorksSelector);
  const rightsChainsList = musicWorks.singleWorks?.rightsChains;
  const countryOption = useMemo(() => {
    if (rightsChainsList?.length) {
      return rightsChainsList.map(el => el.country);
    }
    return [];
  }, [rightsChainsList]);
  const [optionValue, setOptionValue] = useState(countryOption[0] || "");
  const activeChain = useMemo(() => {
    if (rightsChainsList?.length) {
      return rightsChainsList.filter(el => el.country === optionValue)[0];
    }
  }, [optionValue, rightsChainsList]);
  console.log(activeChain, 789);
  const handlesSelectChange = useCallback(e => {
    setOptionValue(e.target.value);
  }, []);

  return (
    <div className={styles.rightsChains}>
      <div className={styles.header}>
        <h6>RIGHTS SUMMARY</h6>
        <div className={styles.infoWrap}>
          <span className={styles.info}>
            Showing data for selected territory only
          </span>
          <span className={styles.label}>Change Territory: </span>
          <UiSelect
            options={countryOption}
            handleChange={handlesSelectChange}
            value={optionValue}
          />
        </div>
      </div>
      <div className={styles.rightsPartyCreatorLabel}>
        <div />
        <div />
        <span>PERFORMANCE OWNERSHIP</span>
        <span>MECHANICAL CONTROL</span>
        <span>SYNC CONTROL</span>
      </div>
      <div className={styles.rightsPartyCreatorWrap}>
        {!!activeChain?.rightsSummaries?.length &&
          activeChain?.rightsSummaries.map(({ rightsPartyCreator }) => {
            return (
              <div
                key={rightsPartyCreator.name}
                className={styles.rightsPartyCreator}
              >
                <span className={styles.signingTerritory}>
                  {rightsPartyCreator.signingTerritory}
                </span>
                <span>{rightsPartyCreator.name}</span>
                <CircleProgress
                  percent={rightsPartyCreator?.mechShare.percentage}
                />
                <CircleProgress
                  percent={rightsPartyCreator?.perfShare.percentage}
                />
                <CircleProgress
                  percent={rightsPartyCreator?.syncShare.percentage}
                />
                <span>{rightsPartyCreator.society}</span>
              </div>
            );
          })}
      </div>
      <div className={styles.wcmTotal}>
        <span className={styles.label}>WCM TOTAL</span>
        <CircleProgress percent={activeChain?.mechTotal || 0} />
        <CircleProgress percent={activeChain?.perfTotal || 0} />
        <CircleProgress percent={activeChain?.syncTotal || 0} />
      </div>
    </div>
  );
};

export default RightsChains;
