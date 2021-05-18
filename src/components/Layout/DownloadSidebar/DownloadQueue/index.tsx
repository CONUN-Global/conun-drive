import React, { useEffect, useReducer } from "react";

import DownloadItem from "./DownloadItem";

import reducer from "./DownloadQueueReducer";

import styles from "./DownloadQueue.module.scss";

const { api } = window;

function DownloadQueue() {
  const [state, dispatch] = useReducer(reducer, {
    downloads: {},
  });
  useEffect(() => {
    const listener = (data) => {
      dispatch({
        type: "SET_DOWNLOAD_DATA",
        payload: { id: data?.data?.content_id, data: data.file },
      });
    };
    api.listenToDownloadSuccess(listener);

    return () => {
      api.removeListener("download-success", listener);
    };
  }, []);

  useEffect(() => {
    const listener = (data) => {
      dispatch({
        type: "ADD_DOWNLOAD",
        payload: {
          id: data?.contentId,
          fileName: data?.name,
          name: data?.title,
          status: "IN_PROGRESS",
          data: null,
        },
      });
    };
    api.listenToDownloadStart(listener);

    return () => {
      api.removeListener("download-start", listener);
    };
  }, []);

  const downloads = Object.keys(state?.downloads);

  return (
    <div className={styles.DownloadQueue}>
      <p className={styles.Title}>Download Queue</p>
      <div>
        {downloads.map((id) => (
          <DownloadItem key={id} download={state?.downloads?.[id]} />
        ))}
      </div>
    </div>
  );
}

export default DownloadQueue;
