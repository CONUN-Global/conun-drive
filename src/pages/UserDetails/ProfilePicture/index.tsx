import React, { useRef, useState } from "react";
import classNames from "classnames";
import { useMutation } from "react-query";

import useGetImage from "../../../hooks/useGetImage";
import useCurrentUser from "../../../hooks/useCurrentUser";

import instance from "../../../axios/instance";

import NoAvatar from "../..//../assets/icons/no-avatar.svg";

import styles from "./ProfilePicture.module.scss";

const { api } = window;

type ProPicProps = {
  children: React.ReactNode;
  avatarImgSrc: string;
  handleEditPic: () => void;
  setMsgShow: (boolean) => void;
};

function ProPic({
  children,
  avatarImgSrc,
  handleEditPic,
  setMsgShow,
}: ProPicProps) {
  if (avatarImgSrc && avatarImgSrc !== "") {
    return (
      <div
        className={styles.ProPic}
        style={{
          backgroundImage: avatarImgSrc,
        }}
        onClick={() => handleEditPic()}
        onMouseEnter={() => {
          setMsgShow(true);
        }}
        onMouseLeave={() => {
          setMsgShow(false);
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <NoAvatar
      className={styles.ProPic}
      onClick={() => handleEditPic()}
      onMouseEnter={() => {
        setMsgShow(true);
      }}
      onMouseLeave={() => {
        setMsgShow(false);
      }}
    >
      {children}
    </NoAvatar>
  );
}

function ProfilePicture({
  avatar,
  isSelf,
}: {
  avatar: string;
  isSelf: boolean;
}) {
  const { currentUser, refetch } = useCurrentUser();
  const { data: avatarImgSrc } = useGetImage(avatar);

  const [msgShow, setMsgShow] = useState<boolean>(true);

  const { mutateAsync: uploadAvatar } = useMutation(async (hash: string) => {
    const formData = new FormData();
    formData.append("avatar", hash);
    const { data } = await instance.put(`/user/${currentUser?.id}`, formData);
    return data;
  });

  const inputRef = useRef(null);

  const handleEditPic = () => {
    inputRef.current.click();
  };

  const handleAvatarUpload = async (e) => {
    const avatarToUpload = e.target.files[0];
    const data = await api.uploadAvatar(avatarToUpload?.path);
    await uploadAvatar(data?.hash);
    refetch();
  };

  if (isSelf === true) {
    return (
      <div className={styles.MyPicBox}>
        <ProPic
          avatarImgSrc={avatarImgSrc}
          handleEditPic={handleEditPic}
          setMsgShow={setMsgShow}
        >
          <span
            className={classNames(styles.EditMessage, {
              [styles.show]: msgShow,
            })}
          >
            Edit
          </span>
        </ProPic>
        <input
          type="file"
          onChange={handleAvatarUpload}
          className={styles.HiddenInput}
          ref={inputRef}
          accept="image/x-png,image/gif,image/jpeg"
        />
      </div>
    );
  }
  return (
    <div className={styles.PicBox}>
      {avatarImgSrc && avatarImgSrc !== "" ? (
        <img className={styles.ProPic} src={avatarImgSrc} />
      ) : (
        <NoAvatar className={styles.ProPic} />
      )}
    </div>
  );
}

export default ProfilePicture;
