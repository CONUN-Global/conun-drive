import React from "react";
import { useHistory, useParams } from "react-router-dom";

import AdditionalDetailsCell from "./AdditionalDetailsCell";
import Button from "../../components/Button";
import MainCell from "./MainCell";
import SimilarProducts from "./SimilarProducts";
import Spinner from "../../components/Spinner";

import useGetFile from "../../hooks/useGetFile";

import BackIcon from "../../assets/icons/left-arrow.svg";

import styles from "./FileDetails.module.scss";

const NO_USER = "NO_USER";

function FileDetails() {
  const { id } = useParams();
  const history = useHistory();

  if (!id) {
    return <div className={styles.Background}>No File</div>;
  }

  if (id === NO_USER) {
    return <div className={styles.Background}>Not logged in</div>;
  }

  const { data, isLoading } = useGetFile(id);

  return (
    <div className={styles.Background}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            noStyle
            onClick={() => history.goBack()}
            className={styles.BackButton}
          >
            <BackIcon className={styles.Icon} />
          </Button>
          <div className={styles.Layout}>
            <MainCell file={data?.data} />
            <AdditionalDetailsCell file={data?.data} />
            <SimilarProducts file={data?.data} />
          </div>
        </>
      )}
    </div>
  );
}

export default FileDetails;
