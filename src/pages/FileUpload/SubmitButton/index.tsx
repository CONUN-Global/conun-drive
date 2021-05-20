import React, { useEffect, useState } from "react";

import Button from "../../../components/Button";
import Tooltip from "../../../components/Tooltip";

import { useAppContext } from "../../../components/AppContext";

import styles from "./SubmitButton.module.scss";

const { api } = window;

const FORM_DEFAULT_VALUES = {
  title: "",
  file: "",
  thumbnail: "",
  description: "",
  tags: [],
  category: null,
  type: null,
};

function SubmitButton({ reset }) {
  const [downloadPercentage, setDownloadPercentage] = useState(null);
  const { isManagerConnected } = useAppContext();

  useEffect(() => {
    const listener = (percentage) => {
      setDownloadPercentage(Math.ceil(percentage));
    };
    api.listenToUploadProgress(listener);

    return () => api.removeListeners("upload-percentage");
  }, []);

  useEffect(() => {
    const listener = () => {
      reset(FORM_DEFAULT_VALUES);
      setDownloadPercentage(null);
    };
    api.listenToUploadSuccess(listener);

    return () => api.removeListeners("upload-success");
  }, []);

  const percentLabel = downloadPercentage
    ? downloadPercentage === 100
      ? "Upload Complete"
      : `${downloadPercentage}%`
    : "Upload Content";

  if (isManagerConnected) {
    return (
      <Button
        type="submit"
        noStyle
        className={styles.UploadButton}
        disabled={!!downloadPercentage}
        data-percentage={downloadPercentage}
      >
        <div
          className={styles.Progress}
          style={{ width: `${downloadPercentage || 0}%` }}
        >
          <div className={styles.Label}>{percentLabel}</div>
        </div>
      </Button>
    );
  }

  return (
    <Tooltip id="upload-button">
      <Button
        type="button"
        className={styles.UploadButton}
        data-for="upload-button"
        data-tip="Connect to Conun manager in order to upload"
      >
        Upload Content
      </Button>
    </Tooltip>
  );
}

export default SubmitButton;
