import React from "react";

import MainCell from "./MainCell";
import AdditionalDetailsCell from "./AdditionalDetailsCell";

import styles from "./FileDetails.module.scss";

function FileDetails() {
  return (
    <div className={styles.Background}>
      <div className={styles.Layout}>
        {/* Side Column */}
        {/* <div className={styles.Cell}>{"<-"}</div> */}
        {/* Main Column */}
        <MainCell />
        {/* Additional Details Column */}
        <AdditionalDetailsCell />
      </div>
    </div>
  );
}

export default FileDetails;
