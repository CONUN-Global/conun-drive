import React from "react";

import Button from "../../../../components/Button";

import styles from "./LikeBar.module.scss";
import HeartIcon from "../../../../assets/icons/heart.svg";

function LikeControls({ likes }: { likes: number }) {
  return (
    <div className={styles.Controls}>
      <Button noStyle>
        <HeartIcon className={styles.Icon} />
        <span className={styles.LikeNumber}>{likes}</span>
      </Button>
    </div>
  );
}

function LikeBar({ downloads, likes }: { downloads: number; likes: number }) {
  return (
    <div className={styles.LikeBar}>
      <div className={styles.Uploaded}>{downloads} Total Downloads</div>
      <LikeControls likes={likes} />
    </div>
  );
}
export default LikeBar;
