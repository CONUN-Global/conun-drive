import React from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

import styles from "./Dropzone.module.scss";

interface DropzoneProps {
  onDrop: (file: any) => void;
  className?: string;
  label?: string;
  withPreview?: boolean;
}

function Dropzone({
  onDrop,
  className,
  label = "Drop your file ",
  withPreview,
}: DropzoneProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  });

  const acceptedFile = acceptedFiles?.[0] ?? null;

  return (
    <div
      className={classNames(styles.Container, className, {
        [styles.hasFile]: !!acceptedFile?.name,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {acceptedFile?.name ? (
        withPreview ? (
          <img
            src={URL.createObjectURL(acceptedFile)}
            className={styles.Preview}
            alt={acceptedFile?.name}
          />
        ) : (
          <span className={styles.Label}>{acceptedFile?.name}</span>
        )
      ) : (
        <span className={styles.Label}>{label}</span>
      )}
    </div>
  );
}

export default Dropzone;
