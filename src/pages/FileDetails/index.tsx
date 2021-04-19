import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import AdditionalDetailsCell from "./AdditionalDetailsCell";
import MainCell from "./MainCell";
import Button from "../../components/Button";

import BackIcon from "../../assets/icons/left-arrow.svg";

import instance from "../../axios/instance";

import styles from "./FileDetails.module.scss";

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

  const { data } = useQuery(
    [id, "get-file"],
    async () => {
      const { data } = await instance.get(`/content/${id}`);
      return data;
    },
    { enabled: !!id }
  );

  console.log(`data`, data);
  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <MainCell file={data?.data} />
        <AdditionalDetailsCell file={data?.data} />
      </div>
    </div>
  );
}

export default FileDetails;
