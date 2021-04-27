import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useMutation } from "react-query";

import instance from "../../axios/instance";

import useCurrentUser from "../../hooks/useCurrentUser";
import Button from "../Button";

import styles from "./ThumbnailEditor.module.scss";
const { api } = window;

interface EditorProps {
  origImage: string;
  boxHeight: number;
  boxWidth: number;
  boxRadius: number;
  handleClose: () => void;
}

function ThumbnailEditor({
  origImage,
  boxHeight,
  boxWidth,
  boxRadius,
  handleClose,
}: EditorProps) {
  const { currentUser, refetch } = useCurrentUser();
  const inputRef = useRef(null);
  const editorRef = useRef(null);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgScale, setImgScale] = useState<number>(1);

  const { mutateAsync: uploadAvatar } = useMutation(async (hash: string) => {
    const formData = new FormData();
    formData.append("avatar", hash);
    const { data } = await instance.put(`/user/${currentUser?.id}`, formData);
    return data;
  });

  const handleAvatarUpload = async (imgData) => {
    const data = await api.uploadAvatar(imgData);
    console.log(data);
    await uploadAvatar(data?.hash);
    await refetch();
  };

  const onClickSave = () => {
    if (editorRef) {
      const scaledImage = editorRef.current
        .getImageScaledToCanvas()
        .toDataURL();
      handleAvatarUpload(scaledImage);
    }
    handleClose();
  };

  return (
    <div className={styles.ThumbnailEditor}>
      <div className={styles.Button}>
        <Button onClick={() => inputRef.current.click()}>Upload File</Button>
      </div>
      <AvatarEditor
        ref={editorRef}
        image={imgFile || origImage}
        scale={imgScale}
        height={boxHeight}
        width={boxWidth}
        borderRadius={boxRadius}
      />
      <div className={styles.Controls}>
        <span>Scale:</span>
        <input
          type="range"
          step="0.02"
          min="1"
          max="4"
          name="scale"
          value={imgScale}
          onChange={(e) => setImgScale(Number(e.target.value))}
        />
      </div>
      {/* Hidden Input here: */}
      <input
        type="file"
        onChange={(e) => setImgFile(e.target.files[0])}
        className={styles.HiddenInput}
        ref={inputRef}
        accept="image/x-png,image/gif,image/jpeg"
      />
      <div className={styles.Button}>
        <Button onClick={() => onClickSave()}>Submit</Button>
      </div>
    </div>
  );
}

export default ThumbnailEditor;
