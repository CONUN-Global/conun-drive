import React from "react";

import styles from "./FileProperties.module.scss";

function FileProperties() {
  return (
    <div className={styles.FileProperties}>
      <span className={styles.Property}>ZIP File Contents 175 kb</span>
      <span className={styles.Property}>Download Speed 10 kb/s</span>
      <span className={styles.Property}>Uploaded May 24, 2021</span>
      <span className={styles.Property}>Updated July 15, 2021</span>
    </div>
  );
}

export default FileProperties;
