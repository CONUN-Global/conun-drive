import React from "react";

import Button from "../../../../components/Button";

import styles from "./UserDetails.module.scss";
import CopyIcon from "../../../../assets/icons/copy.svg";

function UserDetails() {
  return (
    <div className={styles.UserDetails}>
      <div className={styles.ProfilePic}></div>
      <div className={styles.Text}>
        <div className={styles.IDBits}>
          <div className={styles.Label}>ID</div>
          <div className={styles.IDHash}>0x983245FSLKS2987435...</div>
          <div className={styles.CopyBtn}>
            <Button noStyle>
              <CopyIcon className={styles.CopyIcon} />
            </Button>
          </div>
        </div>
        {/* Follow btn goes here later */}
      </div>
    </div>
  );
}
export default UserDetails;
