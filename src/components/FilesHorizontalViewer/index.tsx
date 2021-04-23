import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import FileBox from "../FileBox";

import { FileProps } from "../../types";

import styles from "./FilesHorizontalViewer.module.scss";

interface FilesHorizontalViewerProps {
  files: FileProps[];
}

function FilesHorizontalViewer({ files }: FilesHorizontalViewerProps) {
  return (
    <ScrollContainer className={styles.FilesContainer}>
      {files?.map((file) => (
        <FileBox key={file.id} file={file} />
      ))}
    </ScrollContainer>
  );
}

export default FilesHorizontalViewer;
