import React from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../../components/Button";
import ProfileText from "./ProfileText";
import ProfilePicture from "./ProfilePicture";

import FileCase from "./FileCase";

import styles from "./UserDetails.module.scss";
import BackIcon from "../../assets/icons/back.svg";
import useGetUploads from "../../hooks/useGetUploads";
import useGetDownloads from "../../hooks/useGetDownloads";

const LIMIT = "3";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
  const query = useQuery();
  const authorID = query.get("user");
  const walletHash = query.get("walletHash");
  const avatar = query.get("avatar");

  const { data: uploadsData } = useGetUploads({ authorID, limit: LIMIT });
  const { data: downloadsData } = useGetDownloads({ authorID, limit: LIMIT });

  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <div className={styles.UserInfo}>
          <ProfilePicture avatar={avatar} />
          <ProfileText authorID={authorID} walletHash={walletHash} />
        </div>
        <FileCase title={"My Uploads"} data={uploadsData} />
        <FileCase title={"My Downloads"} data={downloadsData} />
      </div>
    </div>
  );
}

export default UserDetails;
