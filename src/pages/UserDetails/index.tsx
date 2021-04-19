import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

import styles from "./UserDetails.module.scss";
import BackIcon from "../../assets/icons/back.svg";
import UserInfo from "./UserInfo";

function BackButton() {
  return (
    <div className={styles.BackButton}>
      <Button noStyle>
        <Link to="/">
          <BackIcon className={styles.Icon} />
        </Link>
      </Button>
    </div>
  );
}

function UserDetails() {
  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <UserInfo />
        <div>My Uploads</div>
        <div>My Downloads</div>
      </div>
    </div>
  );
}

export default UserDetails;
