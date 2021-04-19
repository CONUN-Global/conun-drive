import React from "react";

import ProfilePicture from "./ProfilePicture";
import ProfileText from "./ProfileText";

import styles from "./UserInfo.module.scss";

export default function UserInfo() {
  return (
    <div className={styles.UserInfo}>
      <ProfilePicture />
      <ProfileText />
    </div>
  );
}
