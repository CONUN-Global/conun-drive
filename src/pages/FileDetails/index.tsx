import React from "react";
import style from "./FileDetails.module.scss";

function FileDetails() {
  return (
    <div className={style.Background}>
      <div className={style.Layout}>
        {/* Side Column */}
        <div className={style.Cell}>
          <div className={style.AddImage}>extra</div>
          <div className={style.AddImage}>extra</div>
          <div className={style.AddImage}>extra</div>
        </div>
        {/* Main Column */}
        <div className={style.Cell}>
          <div className={style.MainImage}>main image</div>
          <div className={style.LikeBar}>Uploaded Today</div>
          <div className={style.ItemTitle}>File Title</div>
          <div className={style.FileProperties}>
            <span className={style.key}>ZIP File Contents</span>
            <span className={style.value}>some kb</span>
            <span className={style.key}>Download Speed</span>
            <span className={style.value}>Some kb/s</span>
          </div>
          <div className={style.PurchaseControls}>
            <span>Purchase Button</span>
          </div>
        </div>
        {/* Additional Details Column */}
        <div className={style.Cell}>
          {/* User Details */}
          <div className={style.UserDetails}>
            <div className={style.ProfilePic}>pic</div>
            <div className={style.Text}>
              <span className={style.IDHash}>ID Hash</span>
              <span className={style.IDHash}>Copy</span>
              <span className={style.Online}>Online</span>
            </div>
          </div>
          {/* Value Cell */}
          <div className={style.ValueBox}>n Ether Valuation</div>
          {/* Item Description */}
          <div className={style.ItemDescription}>
            <div className={style.BoxTitle}>Description</div>
            <div className={style.DescriptionText}>
              Blah blah what it's like etc
            </div>
            <div>See More</div>
          </div>
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
      </div>
    </div>
  );
}

export default FileDetails;
