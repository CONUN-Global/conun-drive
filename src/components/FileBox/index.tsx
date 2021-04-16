import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FileProps } from "../../types";

import Heart from "../../assets/icons/heart.svg";

import styles from "./FileBox.module.scss";

const { api } = window;

export interface FileBoxProps {
  file: FileProps;
}

function FileBox({ file }: FileBoxProps) {
  const { data } = useQuery(
    ["get-preview", file?.info?.thumbnail],
    async () => {
      const data = await api.getFilePreview(file?.info?.thumbnail);

      const preview = new Blob([data.preview.buffer]);
      return URL.createObjectURL(preview);
    },
    {
      enabled: !!file?.info?.thumbnail,
    }
  );

  return (
    <Link to={`file/${file?.id}`} className={styles.FileBox}>
      <img className={styles.FileImage} src={data} alt={file.name} />
      <div className={styles.InfoSection}>
        <div className={styles.Top}>
          <p className={styles.Likes}>
            <Heart className={styles.Heart} />
            389
          </p>
          <p className={styles.Downloads}>12563 Downloads</p>
        </div>
        <p className={styles.FileName}>{file.name}</p>
      </div>
    </Link>
  );
}

export default FileBox;
