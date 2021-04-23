import React from "react";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";

import Button from "../../components/Button";

import useGetUploads from "../../hooks/useGetUploads";
import useGetDownloads from "../../hooks/useGetDownloads";
import useCurrentUser from "../../hooks/useCurrentUser";
import useGetImage from "../../hooks/useGetImage";

import trunc from "../../helpers/trunc";

import { FileProps } from "../../types";

import BackIcon from "../../assets/icons/back.svg";

import styles from "./UserFiles.module.scss";

const LIMIT = "10";

interface CellProps {
  file: FileProps;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function UserFiles() {
  const query = useQuery();

  const { currentUser } = useCurrentUser();

  const { id: authorID } = useParams();

  const isSelf = currentUser?.id.toString() === authorID.toString();
  const purpose = query.get("purpose");

  let fileData;

  if (purpose === "uploads") {
    const { data: uploadsData } = useGetUploads({ authorID, limit: LIMIT });
    fileData = uploadsData?.data;
  } else if (purpose === "downloads" && isSelf) {
    // It prevents anyone else seeing your downloads
    const { data: downloadsData } = useGetDownloads({ authorID, limit: LIMIT });
    fileData = downloadsData?.data;
  }

  let pageTitle;

  if (isSelf) {
    purpose === "uploads"
      ? (pageTitle = "My Uploads")
      : (pageTitle = "My Downloads");
  } else {
    purpose === "uploads"
      ? (pageTitle = "User's Uploads")
      : (pageTitle = "User's Downloads");
  }
  console.log("Is it you? ", isSelf);
  console.log(fileData);
  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <div className={styles.Title}>{pageTitle}</div>
        <div className={styles.ResultsTable}>
          {fileData && fileData.map((f) => <Cell key={f.id} file={f} />)}
        </div>
      </div>
    </div>
  );
}

export default UserFiles;
