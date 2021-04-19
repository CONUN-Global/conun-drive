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

function LikeBar() {
  return (
    <div className={styles.LikeBar}>
      <div className={styles.Uploaded}>1,298 Total Downloads</div>
      <LikeControls likes={873} />
    </div>
  );
}
export default LikeBar;
