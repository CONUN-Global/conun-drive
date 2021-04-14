import React from "react";

import { FileProps } from "../../types";

import Heart from "../../assets/icons/heart.svg";

import styles from "./FileBox.module.scss";

export interface FileBoxProps {
  file: FileProps;
}

function FileBox({ file }: FileBoxProps) {
  return (
    <div className={styles.FileBox}>
      <img
        className={styles.FileImage}
        src="https://source.unsplash.com/random/189x106"
        alt={file.name}
      />
      <div className={styles.InfoSection}>
        <div className={styles.Top}>
          <p className={styles.Likes}>
            <Heart className={styles.Heart} />
            389
          </p>
          <p className={styles.Downloads}>12563 Downloads</p>
        </div>
        <p className={styles.FileName}>{file.name}</p>
      </div>
    </div>
  );
}

export default FileBox;
