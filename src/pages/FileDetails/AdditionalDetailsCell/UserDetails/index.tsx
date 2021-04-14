import React from "react";

import style from "./UserDetails.module.scss";

function UserDetails() {
  return (
    <div className={style.UserDetails}>
      <div className={style.ProfilePic}></div>
      <div className={style.Text}>
        <div className={style.IDBits}>
          <div className={style.IDHash}>ID 0x3AbDBFF0cD0...</div>
          <div className={style.CopyBtn}></div>
        </div>
        {/* Follow btn goes here later */}
      </div>
    </div>
  );
}
export default UserDetails;
