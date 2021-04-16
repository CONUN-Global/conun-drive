import React from "react";

import UserDetails from "./UserDetails";
import Description from "./Description";
import TagsBox from "./TagsBox";
import InsightsBox from "./InsightsBox";

import styles from "./AdditionalDetailsCell.module.scss";

function AdditionalDetailsCell() {
  return (
    <div className={styles.Cell}>
      <UserDetails />
      <Description />
      <TagsBox />
      <InsightsBox />
    </div>
  );
}

export default AdditionalDetailsCell;
