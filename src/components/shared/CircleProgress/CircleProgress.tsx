import "react-circular-progressbar/dist/styles.css";

import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import styles from "./CircleProgress.module.scss";

type CircleProgressType = {
  percent: number;
};

const CircleProgress: React.FC<CircleProgressType> = ({ percent }) => (
  <div className={styles.circleProgress}>
    <span className={styles.label}>{percent ? percent : "--.--"}</span>
    <CircularProgressbar
      value={percent}
      className={styles.progressWrap}
      styles={buildStyles({
        trailColor: "#888F9A",
        pathColor: "#D0B152"
      })}
    />
  </div>
);

export default CircleProgress;
