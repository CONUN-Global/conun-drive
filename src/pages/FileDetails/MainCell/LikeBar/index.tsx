import React from "react";

import style from "./LikeBar.module.scss";

function LikeBar() {
  return (
    <div className={style.LikeBar}>
      <div className={style.Uploaded}>Uploaded Today</div>
      <div className={style.Controls}>Controls here</div>
    </div>
  );
}
export default LikeBar;
