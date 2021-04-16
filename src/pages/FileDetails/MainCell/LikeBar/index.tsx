import React from "react";

import styles from "./LikeBar.module.scss";

function LikeBar() {
  return (
    <div className={styles.LikeBar}>
      <div className={styles.Uploaded}>Uploaded Today</div>
      <div className={styles.Controls}>Controls here</div>
    </div>
  );
}
export default LikeBar;
