import React from "react";

import style from "./FileProperties.module.scss";

function FileProperties() {
  return (
    <div className={style.FileProperties}>
      <span className={style.Key}>ZIP File Contents</span>
      <span className={style.Value}>175 kb</span>
      <span className={style.Key}>Download Speed</span>
      <span className={style.Value}>10 kb/s</span>
    </div>
  );
}

export default FileProperties;
