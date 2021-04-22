import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import Button from "../Button";

import HeartFull from "../../assets/icons/heart-full.svg";
import HeartEmpty from "../../assets/icons/heart-empty.svg";
import Tooltip from "../Tooltip";

import useLikeContent from "../../hooks/useLikeContent";
import useCurrentUser from "../../hooks/useCurrentUser";

import { FileProps } from "../../types";

import styles from "./FileBox.module.scss";

const { api } = window;

export interface FileBoxProps {
  file: FileProps;
}

function FileBox({ file }: FileBoxProps) {
  const [localLikeStatus, setLocalLikeStatus] = useState(file?.is_liked);
  const [localLikeCount, setLocalLikeCount] = useState(
    file?.content_stats.likes_cnt
  );

  const { likeContent } = useLikeContent();

  const { currentUser } = useCurrentUser();

  const { data } = useQuery(
    ["get-preview", file?.info?.thumbnail],
    async () => {
      const data = await api.getFilePreview(file?.info?.thumbnail);

      const preview = new Blob([data?.preview?.buffer]);
      return URL.createObjectURL(preview);
    },
    {
      enabled: !!file?.info?.thumbnail,
      refetchOnMount: true,
    }
  );

  const handleLike = async () => {
    await likeContent({
      userId: currentUser?.id,
      contentId: file?.id,
      publicHash: file?.info?.public_hash,
    });

    setLocalLikeStatus(true);
    setLocalLikeCount((prev) => prev + 1);
  };

  return (
    <div className={styles.FileBox}>
      <Link to={`file/${file?.id}`} className={styles.Link}>
        <img className={styles.FileImage} src={data} alt={file.name} />
      </Link>
      <div className={styles.InfoSection}>
        <div className={styles.Top}>
          <div className={styles.Likes}>
            {localLikeStatus ? (
              <HeartFull className={styles.Heart} />
            ) : (
              <Tooltip id="like">
                <Button
                  noStyle
                  type="button"
                  onClick={handleLike}
                  data-for="like"
                  data-tip="Liking is permanent."
                >
                  <HeartEmpty className={styles.Heart} />
                </Button>
              </Tooltip>
            )}
            {localLikeCount}
          </div>
          <p className={styles.Downloads}>
            {file?.content_stats?.downloads_cnt} Downloads
          </p>
        </div>
        <Link to={`file/${file?.id}`} className={styles.Link}>
          <p className={styles.FileName}>{file.name}</p>
        </Link>
      </div>
    </div>
  );
}

export default FileBox;
