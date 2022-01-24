import React from "react";
import { Form } from "react-bootstrap";

import styles from "./UiSelect.module.scss";

type UiSelectType = {
  options: string[];
  value: string;
  handleChange: (e: { target: { value: string } }) => void;
};

const UiSelect: React.FC<UiSelectType> = ({ options, handleChange, value }) => {
  return (
    <Form.Select
      className={styles.uiSelect}
      value={value}
      onChange={handleChange}
    >
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </Form.Select>
  );
};

export default UiSelect;
