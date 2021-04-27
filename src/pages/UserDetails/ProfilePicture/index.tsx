import React, { useRef, useState } from "react";
import classNames from "classnames";
import { useMutation } from "react-query";

import Modal from "../../../components/Modal";
import ThumbnailEditor from "../../../components/ThumbnailEditor";

import useGetImage from "../../../hooks/useGetImage";
import useCurrentUser from "../../../hooks/useCurrentUser";

import instance from "../../../axios/instance";

import NoAvatar from "../../../assets/icons/no-avatar.svg";

import styles from "./ProfilePicture.module.scss";

const { api } = window;

type ProPicProps = {
  avatarImgSrc: string;
  msgShow: boolean;
  setMsgShow: (boolean) => void;
};

function ProPic({ avatarImgSrc, msgShow, setMsgShow }: ProPicProps) {
  if (avatarImgSrc && avatarImgSrc !== "") {
    return (
      <img
        className={classNames(styles.ProPic, {
          [styles.show]: msgShow,
        })}
        src={avatarImgSrc}
        onMouseEnter={() => {
          setMsgShow(true);
        }}
        onMouseLeave={() => {
          setMsgShow(false);
        }}
      />
    );
  }

  return (
    <NoAvatar
      className={classNames(styles.ProPic, {
        [styles.show]: msgShow,
      })}
      onMouseEnter={() => {
        setMsgShow(true);
      }}
      onMouseLeave={() => {
        setMsgShow(false);
      }}
    />
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

  const [msgShow, setMsgShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { mutateAsync: uploadAvatar } = useMutation(async (hash: string) => {
    const formData = new FormData();
    formData.append("avatar", hash);
    const { data } = await instance.put(`/user/${currentUser?.id}`, formData);
    return data;
  });

  const inputRef = useRef(null);

  const handleEditPic = () => {
    console.log("edit");
    setShowModal(true); // inputRef.current.click();
  };

  const handleAvatarUpload = async (e) => {
    const avatarToUpload = e.target.files[0];
    const data = await api.uploadAvatar(avatarToUpload?.path);
    await uploadAvatar(data?.hash);
    refetch();
  };
  console.log(showModal);
  if (isSelf === true) {
    return (
      <>
        <div className={styles.MyPicBox} onClick={handleEditPic}>
          <ProPic
            avatarImgSrc={avatarImgSrc}
            msgShow={msgShow}
            setMsgShow={setMsgShow}
          />
          <input
            type="file"
            onChange={handleAvatarUpload}
            className={styles.HiddenInput}
            ref={inputRef}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <span
            className={classNames(styles.EditMessage, {
              [styles.show]: msgShow,
            })}
            onMouseEnter={() => {
              setMsgShow(true);
            }}
            onMouseLeave={() => {
              setMsgShow(false);
            }}
          >
            edit
          </span>
        </div>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ThumbnailEditor boxHeight={220} boxWidth={220} boxRadius={110} />
        </Modal>
      </>
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
