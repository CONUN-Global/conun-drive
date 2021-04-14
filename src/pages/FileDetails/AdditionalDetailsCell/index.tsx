import React from "react";

import UserDetails from "./UserDetails";

import style from "./AdditionalDetailsCell.module.scss";
import Valuation from "./Valuation";
import Description from "./Description";

function AdditionalDetailsCell() {
  return (
    <div className={style.Cell}>
      <UserDetails />
      <Valuation />
      {/* Item Description */}
      <Description />
      {/* Tags */}
      <div className={style.Tags}>
        <span className={style.Tag}>Art</span>
        <span className={style.Tag}>Painting</span>
        <span className={style.Tag}>Helicopter</span>
      </div>
      {/* Insights */}
      <div className={style.InsightsBox}>
        <div className={style.BoxTitle}>Insights</div>
        <span className={style.UploadedDate}>Uploaded Today</span>
        <span className={style.UpdatedDate}>Updated Today</span>
        <span className={style.TotalDownloads}>X Total Downloads</span>
      </div>
      {/* Extra */}
      <div className={style.ExtraBox}>
        <div className={style.BoxTitle}>Language</div>
        <div className={style.ExtraDetail}>English (UK)</div>
      </div>
      {/* End */}
    </div>
  );
}

export default AdditionalDetailsCell;
