import React from "react";
import { useQuery } from "react-query";
import instance from "../../axios/instance";
import FileBox from "../FileBox";

import styles from "./FilesHorizontalViewer.module.scss";

interface FilesHorizontalViewerProps {
  category: string;
}

function FilesHorizontalViewer({ category }: FilesHorizontalViewerProps) {
  const { data } = useQuery(["files", category], async () => {
    const formData = new FormData();
    formData.append("category_id", category);
    formData.append("order_by", "rate");
    const { data } = await instance.post("/content/get-contents-by", formData);
    return data;
  });

  return (
    <div className={styles.FilesContainer}>
      {data?.data?.map((file) => (
        <FileBox key={file.id} file={file} />
      ))}
    </div>
  );
}

export default FilesHorizontalViewer;
