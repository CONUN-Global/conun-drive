import React from "react";

import Button from "../../../components/Button";
import LikeBar from "./LikeBar";
import FileProperties from "./FileProperties";

import styles from "./MainCell.module.scss";
import { FileProps } from "../../../types";
import { useQuery } from "react-query";

const { api } = window;
interface MainCellProps {
  file: FileProps;
}

function MainCell({ file }: MainCellProps) {
  const { data } = useQuery(
    ["get-preview", file?.info?.thumbnail],
    async () => {
      const data = await api.getFilePreview(file?.info?.thumbnail);

      const preview = new Blob([data.preview.buffer]);
      return URL.createObjectURL(preview);
    },
    {
      enabled: !!file?.info?.thumbnail,
    }
  );

  return (
    <div className={styles.Cell}>
      <div className={styles.MainImage}>
        <img className={styles.MainImage} src={data}></img>
      </div>
      <LikeBar
        downloads={file?.content_stats.downloads_cnt}
        likes={file?.content_stats.likes_cnt}
      />
      <div className={styles.ItemTitle}>{file?.name}</div>
      <FileProperties
        fileExt={file?.info.ext}
        fileSize={file?.info.size}
        created={file?.info.created_at}
      />
      <div className={styles.PurchaseControls}>
        <Button className={styles.PurchaseButton} type="button">
          Download
        </Button>
      </div>
    </div>
  );
}

export default MainCell;
