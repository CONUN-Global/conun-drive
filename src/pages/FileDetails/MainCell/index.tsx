import React from "react";

import Button from "../../../components/Button";
import LikeBar from "./LikeBar";
import FileProperties from "./FileProperties";

import styles from "./MainCell.module.scss";

function MainCell() {
  return (
    <div className={styles.Cell}>
      <div className={styles.MainImage}>main image</div>
      <LikeBar />
      <div className={styles.ItemTitle}>File Title</div>
      <FileProperties />
      <div className={styles.PurchaseControls}>
        <Button>Purchase</Button>
      </div>
    </div>
  );
}

export default MainCell;
