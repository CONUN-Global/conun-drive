import React from "react";

import UserDetails from "./UserDetails";

import styles from "./AdditionalDetailsCell.module.scss";
import Description from "./Description";
import TagsBox from "./TagsBox";
import InsightsBox from "./InsightsBox";

function AdditionalDetailsCell() {
  return (
    <div className={styles.Cell}>
      <UserDetails />
      <Description />
      <TagsBox />
      {/* Insights */}
      <InsightsBox />
      {/* Extra */}

      {/* End */}
    </div>
  );
}

export default AdditionalDetailsCell;
