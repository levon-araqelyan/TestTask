import React, { useCallback, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import cn from "classnames";

import styles from "./SearchInput.module.scss";

import { musicWorksSelector } from "../../../store/musicWorks/selectors";
import { getUrlParams } from "../../../utils";

const SearchInput = () => {
  const history = useHistory();
  const params = getUrlParams(history.location.search);
  const [innerValue, setInnerValue] = useState(params?.value || "");
  const { musicWorks } = useSelector(musicWorksSelector);
  const { total } = musicWorks;

  const handleChange = useCallback(e => setInnerValue(e.target.value), [
    setInnerValue
  ]);

  const handleClick = useCallback(
    () =>
      history.push(
        `?page=${1}&value=${innerValue}&sort=${params?.sort ||
          "creationYear"}&since=${params?.since || 1983}&till=${params?.till ||
          2020}`
      ),
    [params, innerValue, history]
  );

  return (
    <div className={styles.searchInput}>
      <span>SEARCH RESULTS {`(${total})`}</span>
      <InputGroup className={cn(styles.inputWrap)}>
        <FormControl
          placeholder="Recipient's username"
          value={innerValue}
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleClick}
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
