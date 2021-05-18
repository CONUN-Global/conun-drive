import React from "react";
import { saveAs } from "file-saver";

import SmallSpinner from "../../../../Spinner/SmallSpinner";
import Button from "../../../../Button";

import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg";

import styles from "./DownloadItem.module.scss";

interface DownloadItemProps {
  download: {
    id: string;
    name: string;
    status: "IN_PROGRESS" | "FINISHED" | "CANCELLED";
    fileName: string;
    data: any;
  };
}

function DownloadIcon({
  status,
}: {
  status: "IN_PROGRESS" | "FINISHED" | "CANCELLED";
}) {
  if (status === "IN_PROGRESS") {
    return <SmallSpinner className={styles.Loading} inverted />;
  }

  return <CheckmarkIcon className={styles.CheckmarkIcon} />;
}

function DownloadItem({ download }: DownloadItemProps) {
  const downloadFile = () => {
    if (download?.data) {
      const newFile = new Blob(download?.data);
      saveAs(newFile, download?.fileName);
    }
  };

  return (
    <Button className={styles.Download} onClick={downloadFile} noStyle>
      <p className={styles.Title}>{download.name}</p>

      <DownloadIcon status={download.status} />
    </Button>
  );
}

export default DownloadItem;
