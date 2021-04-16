import React from "react";

import styles from "./FileProperties.module.scss";

function FileProperties() {
  return (
    <div className={styles.FileProperties}>
      <span className={styles.Key}>ZIP File Contents</span>
      <span className={styles.Value}>175 kb</span>
      <span className={styles.Key}>Download Speed</span>
      <span className={styles.Value}>10 kb/s</span>
    </div>
  );
}

export default FileProperties;
