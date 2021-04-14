import React from "react";

import LikeBar from "./LikeBar";
import FileProperties from "./FileProperties";

import style from "./MainCell.module.scss";

function MainCell() {
  return (
    <div className={style.Cell}>
      <div className={style.MainImage}>main image</div>
      <LikeBar />
      <div className={style.ItemTitle}>File Title</div>
      <FileProperties />
      <div className={style.PurchaseControls}>
        <span>Purchase Button</span>
      </div>
    </div>
  );
}

export default MainCell;
