import React from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

import styles from "./Dropzone.module.scss";

interface DropzoneProps {
  currentFile?: any;
  onDrop: (file: any) => void;
  className?: string;
  label?: string;
  withPreview?: boolean;
}

function Dropzone({
  onDrop,
  className,
  label = "Drop your file ",
  currentFile,
  withPreview,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      className={classNames(styles.Container, className, {
        [styles.hasFile]: !!currentFile?.name,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {currentFile?.name ? (
        withPreview ? (
          <img
            src={URL.createObjectURL(currentFile)}
            className={styles.Preview}
            alt={currentFile?.name}
          />
        ) : (
          <span className={styles.Label}>{currentFile?.name}</span>
        )
      ) : (
        <span className={styles.Label}>{label}</span>
      )}
    </div>
  );
}

export default Dropzone;