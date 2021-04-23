import React from "react";
import { Link } from "react-router-dom";

import useGetImage from "../../../../hooks/useGetImage";

import { FileProps } from "../../../../types";

import styles from "./SimilarCell.module.scss";

interface SimProps {
  file: FileProps;
}

function SimilarCell({ file }: SimProps) {
  const { data: thumbImgSrc } = useGetImage(file.info.thumbnail);

  return (
    <Link to={`/file/${file.id}`}>
      <div className={styles.SimilarCell}>
        <img src={thumbImgSrc} className={styles.Thumbnail} />
        <div className={styles.Text}>{file.name}</div>
      </div>
    </Link>
  );
}

export default SimilarCell;
