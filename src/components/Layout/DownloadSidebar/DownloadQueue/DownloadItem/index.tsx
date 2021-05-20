import React from "react";
import { saveAs } from "file-saver";

import Button from "../../../../Button";

import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg";

import styles from "./DownloadItem.module.scss";

interface DownloadItemProps {
  download: {
    id: string;
    name: string;
    status: "IN_PROGRESS" | "FINISHED" | "CANCELLED";
    fileName: string;
    percentage: number;
    data: any;
  };
}

function DownloadIcon({ download }: DownloadItemProps) {
  if (download.status === "FINISHED") {
    return <CheckmarkIcon className={styles.CheckmarkIcon} />;
  }
  if (download.status === "CANCELLED") {
    return <CheckmarkIcon className={styles.CancelledIcon} />;
  }
  return null;
}

function ProgressBar({ download }: DownloadItemProps) {
  return (
    <div className={styles.ProgressBar}>
      <span
        className={styles.Progress}
        style={{ width: `${download.percentage}%` }}
      ></span>
    </div>
  );
}

function DownloadItem({ download }: DownloadItemProps) {
  const downloadFile = () => {
    if (download?.data) {
      const newFile = new Blob(download?.data);
      saveAs(newFile, download?.fileName);
    }
  };

  return (
    <>
      <Button className={styles.Download} onClick={downloadFile} noStyle>
        <p className={styles.Title}>{download.name}</p>
        <DownloadIcon download={download} />
      </Button>
      <ProgressBar download={download} />
    </>
  );
}

export default DownloadItem;
