import React from "react";
import { Link } from "react-router-dom";

import AdditionalDetailsCell from "./AdditionalDetailsCell";
import MainCell from "./MainCell";
import Button from "../../components/Button";

import BackIcon from "../../assets/icons/left-arrow.svg";

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
  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <MainCell />
        {/* Additional Details Column */}
        <AdditionalDetailsCell />
      </div>
    </div>
  );
}

export default FileDetails;
