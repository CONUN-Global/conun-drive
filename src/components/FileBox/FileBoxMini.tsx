import React from "react";
import { Link } from "react-router-dom";

import useGetImage from "../../hooks/useGetImage";

import { FileProps } from "../../types";

import styles from "./FileBoxMini.module.scss";

export interface FileBoxMiniProps {
  file: FileProps;
}

function FileBoxMini({ file }: FileBoxMiniProps) {
  const { data } = useGetImage(file?.info?.thumbnail);

  return (
    <Link className={styles.FileBoxMini} to={`file/${file?.id}`}>
      <img className={styles.FileImage} src={data} alt={file.name} />
      <p className={styles.FileName}>{file.name}</p>
    </Link>
  );
}

export default FileBoxMini;
