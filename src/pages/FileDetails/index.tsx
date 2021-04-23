import React from "react";
import { Link, useParams } from "react-router-dom";

import AdditionalDetailsCell from "./AdditionalDetailsCell";
import Button from "../../components/Button";
import MainCell from "./MainCell";

import useGetFile from "../../hooks/useGetFile";

import BackIcon from "../../assets/icons/left-arrow.svg";

import styles from "./FileDetails.module.scss";
import SimilarProducts from "./SimilarProducts";

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

function FileDetails() {
  const { id } = useParams();

  const { data } = useGetFile(id);

  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <MainCell file={data?.data} />
        <AdditionalDetailsCell file={data?.data} />
        <SimilarProducts file={data?.data} />
      </div>
    </div>
  );
}

export default FileDetails;
