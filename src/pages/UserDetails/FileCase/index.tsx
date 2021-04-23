import React from "react";
import { useQuery } from "react-query";

import DownIcon from "../../../assets/icons/download.svg";
import FlameIcon from "../../../assets/icons/flame.svg";
import LikeIcon from "../../../assets/icons/heart.svg";

import { FileProps } from "../../../types";
import isHot from "../../../helpers/isHot";
import styles from "./FileCase.module.scss";

const { api } = window;

type FileCaseProps = {
  title: string;
  data: Array<FileProps>;
};

interface CellProps {
  data: FileProps;
}

function Thumbnail({ thumbHash }: { thumbHash: string }) {
  const { data } = useQuery(
    ["get-preview", thumbHash],
    async () => {
      const data = await api.getFilePreview(thumbHash);

      const preview = new Blob([data.preview.buffer]);
      return URL.createObjectURL(preview);
    },
    {
      enabled: !!thumbHash,
    }
  );

  return (
    <div className={styles.CellImage}>
      <img src={data} />
    </div>
  );
}

function Cell({ data }: CellProps) {
  return (
    <div className={styles.Cell}>
      <div className={styles.CellDetails}>
        <span className={styles.Date}>
          {new Date(data.info.created_at).toLocaleDateString()}
        </span>
        <div className={styles.Right}>
          <span className={styles.Icon}>
            {/* Need a function for this */}
            {isHot(data.content_stats.rate) && (
              <FlameIcon className={styles.Icon} />
            )}
          </span>
          <DownIcon className={styles.Icon} />
          <span className={styles.Count}>
            {data.content_stats.downloads_cnt}
          </span>
        </div>
      </div>

      <Thumbnail thumbHash={data.info.thumbnail} />

      <div className={styles.CellTitleBar}>
        <span className={styles.Title}>{data.name}</span>
        <div className={styles.Right}>
          <LikeIcon className={styles.Icon} />
          <span className={styles.Count}>{data.content_stats.likes_cnt}</span>
        </div>
      </div>
    </div>
  );
}

function FileCase({ title, data }: FileCaseProps) {
  return (
    <div className={styles.FileCase}>
      <div className={styles.TitleBar}>
        <div className={styles.Title}>{title}</div>
        <div className={styles.SeeMore}>See More</div>
      </div>
      <div className={styles.Table}>
        {data && data.map((d) => <Cell key={d.id} data={d} />)}
      </div>
    </div>
  );
}

export default FileCase;
