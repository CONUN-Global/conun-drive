import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";

import FileCase from "./FileCase";

import styles from "./UserDetails.module.scss";
import BackIcon from "../../assets/icons/back.svg";
import UserInfo from "./UserInfo";
import useMyUploads from "../../hooks/useMyUploads";
import useMyDownloads from "../../hooks/useMyDownloads";

const LIMIT = "3";

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
  const authorID = "17";

  const { data: uploadsData } = useMyUploads({ authorID, LIMIT });
  const { data: downloadsData } = useMyDownloads({ authorID, LIMIT });

  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <UserInfo />
        <FileCase title={"My Uploads"} data={uploadsData} />
        <FileCase title={"My Downloads"} data={downloadsData} />
      </div>
    </div>
  );
}

export default UserDetails;
