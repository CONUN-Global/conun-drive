import React from "react";
import classNames from "classnames";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import styles from "./Dropzone.module.scss";
import { toast } from "react-toastify";

interface DropzoneProps extends DropzoneOptions {
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
  accept,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize: 2000000000,
    onDropRejected: () => {
      toast.error("Your file is too big. Max file size is 2gb.", {
        autoClose: 1500,
        position: "bottom-center",
      });
    },
  });

  return (
    <div
      className={classNames(styles.Container, className, {
        [styles.hasFile]: !!currentFile?.name,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {currentFile ? (
        withPreview ? (
          <img
            src={currentFile}
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
