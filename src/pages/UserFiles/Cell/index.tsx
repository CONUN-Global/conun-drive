import React from "react";

import useGetImage from "../../../hooks/useGetImage";

import trunc from "../../../helpers/trunc";

import { FileProps } from "../../../types";

import HeartFullIcon from "../../../assets/icons/heart-full.svg";
import HeartEmptyIcon from "../../../assets/icons/heart-empty.svg";
import DownloadIcon from "../../../assets/icons/download.svg";

import styles from "./Cell.module.scss";

interface CellProps {
  file: FileProps;
}

interface ControlProps {
  likes: number;
  downloads: number;
}

function Controls({ likes, downloads }: ControlProps) {
  return (
    <div className={styles.Controls}>
      <div className={styles.ControlGrid}>
        <div className={styles.Count}>{likes.toLocaleString()}</div>
        <div className={styles.LikeBtn}>
          <HeartEmptyIcon className={styles.Icon} />
        </div>

        <div className={styles.Count}>{downloads.toLocaleString()}</div>
        <div className={styles.DLBtn}>
          <DownloadIcon className={styles.Icon} />
        </div>
      </div>
    </div>
  );
}

function Cell({ file }: CellProps) {
  const { data: thumbImgSrc } = useGetImage(file.info.thumbnail);

  return (
    <div className={styles.Cell}>
      <img className={styles.Thumb} src={thumbImgSrc} />
      <div className={styles.Text}>
        <span className={styles.Title}>{trunc(file.name, 100)}</span>
        <span className={styles.Date}>
          {new Date(file.info.created_at).toLocaleDateString()}
        </span>
      </div>
      <Controls
        likes={file.content_stats.likes_cnt}
        downloads={file.content_stats.downloads_cnt}
      />
    </div>
  );
}

export default Cell;
