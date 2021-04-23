import React from "react";
import { useQuery } from "react-query";
import ScrollContainer from "react-indiana-drag-scroll";

import FileBox from "../FileBox";

import instance from "../../axios/instance";

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
    return data.data;
  });

  return (
    <ScrollContainer className={styles.FilesContainer}>
      {data?.data?.data?.map((file) => (
        <FileBox key={file.id} file={file} />
      ))}
    </ScrollContainer>
  );
}

export default FilesHorizontalViewer;
