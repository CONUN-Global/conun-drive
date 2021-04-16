import React from "react";

import styles from "./UserDetails.module.scss";

function UserDetails() {
  return (
    <div className={styles.UserDetails}>
      <div className={styles.ProfilePic}></div>
      <div className={styles.Text}>
        <div className={styles.IDBits}>
          <div className={styles.IDHash}>ID 0x3AbDBFF0cD0...</div>
          <div className={styles.CopyBtn}></div>
        </div>
        {/* Follow btn goes here later */}
      </div>
    </div>
  );
}
export default UserDetails;
