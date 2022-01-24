import "rc-slider/assets/index.css";

import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { createSliderWithTooltip, Range } from "rc-slider";

import styles from "./SortForm.module.scss";

import { getKeyByValue, getUrlParams } from "../../../utils";
import UiSelect from "../../shared/UiSelect";

const sortBy: any = {
  creationYear: "CRITERION YEAR",
  title: "SONG TITLE"
};

const SortForm = () => {
  const SliderWithTooltip = createSliderWithTooltip(Range);

  const history = useHistory();
  const params = getUrlParams(history.location.search);
  const [selectValue, setSelectValue] = useState(
    params?.sort || "creationYear"
  );
  const handleSelectChange = useCallback(
    e => {
      history.push(
        `?page=1&value=${params?.value || ""}&sort=${getKeyByValue(
          sortBy,
          e.target.value
        )}&since=${params?.since || 1983}&till=${params?.till || 2020}`
      );
      setSelectValue(getKeyByValue(sortBy, e.target.value));
    },
    [params, setSelectValue, history]
  );

  const handleRangeChange = useCallback(
    range => {
      history.push(
        `?page=1&value=${params?.value || ""}&sort=${params?.sort ||
          "creationYear"}&since=${range[0]}&till=${range[1]}`
      );
    },
    [history, params]
  );

  return (
    <div className={styles.sortForm}>
      <div className={styles.selectWrap}>
        <span>SORT BY: </span>
        <UiSelect
          options={["CRITERION YEAR", "SONG TITLE"]}
          value={sortBy[selectValue]}
          handleChange={handleSelectChange}
        />
      </div>
      <div className={styles.rangeWrap}>
        <span>DATE RANGE:</span>
        <SliderWithTooltip
          min={1983}
          max={2020}
          onAfterChange={handleRangeChange}
          defaultValue={[params?.since || 1983, params?.till || 2020]}
        />
      </div>
    </div>
  );
};

export default SortForm;
