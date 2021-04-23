import React from "react";

import useGetImage from "../../../hooks/useGetImage";

import trunc from "../../../helpers/trunc";

import { FileProps } from "../../../types";

import styles from "./Cell.module.scss";

interface CellProps {
  file: FileProps;
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
      <div className={styles.Controls}>Ctrl</div>
    </div>
  );
}

export default Cell;
