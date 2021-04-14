import React from "react";

import MainCell from "./MainCell";
import AdditionalDetailsCell from "./AdditionalDetailsCell";

import style from "./FileDetails.module.scss";

function FileDetails() {
  return (
    <div className={style.Background}>
      <div className={style.Layout}>
        {/* Side Column */}
        <div className={style.Cell}>
          <div className={style.AddImage}>extra</div>
        </div>
        {/* Main Column */}
        <MainCell />
        {/* Additional Details Column */}
        <AdditionalDetailsCell />
      </div>
    </div>
  );
}

export default FileDetails;
