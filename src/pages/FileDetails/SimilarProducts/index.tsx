import React from "react";
import useGetSimilar from "../../../hooks/useGetSimilar";

import { FileProps } from "../../../types";
import SimilarCell from "./SimilarCell";

import styles from "./SimilarProducts.module.scss";

interface SimProps {
  file: FileProps;
}

function SimilarProducts({ file }: SimProps) {
  const { data: similarData } = useGetSimilar(file?.id);
  return (
    <div className={styles.SimilarProducts}>
      <div className={styles.Title}>Similar Items</div>
      <div className={styles.VertFileBox}>
        {similarData &&
          similarData.map((d) => <SimilarCell key={d.id} file={d} />)}
      </div>
    </div>
  );
}

export default SimilarProducts;
