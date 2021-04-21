import React from "react";

import { useQuery } from "react-query";
import { saveAs } from "file-saver";

import Button from "../../../components/Button";
import LikeBar from "./LikeBar";
import FileProperties from "./FileProperties";

import useCurrentUser from "../../../hooks/useCurrentUser";
import useDownloadFile from "../../../hooks/useDownloadFile";

import { FileProps } from "../../../types";
\import trunc from "../../../helpers/trunc";

import styles from "./MainCell.module.scss";


const { api } = window;
interface MainCellProps {
  file: FileProps;
}

function MainCell({ file }: MainCellProps) {

  const { currentUser} = useCurrentUser()
  const { downloadFile, isLoading } = useDownloadFile();

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
        publicHash={file?.info.public_hash}
        contentId={file?.id}
      />
      <div className={styles.ItemTitle}>{file && trunc(file.name, 55)}</div>
      <FileProperties
        fileExt={file?.info.ext}
        fileSize={file?.info.size}
        created={file?.info.created_at}
      />
      <div className={styles.PurchaseControls}>
        <Button
          className={styles.PurchaseButton}
          type="button"
          loading={isLoading}
          onClick={async () => {
            const data: any = await downloadFile({
              hash: file?.info?.content_hash,
              publicHash: file?.info?.public_hash,
              userId: currentUser?.id,
              contentId: file?.id
            });
            const newFile = new Blob(data.file);
            saveAs(newFile, file?.info.file_name);
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}

export default MainCell;
