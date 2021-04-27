import React, { useState } from "react";
import classNames from "classnames";

import Modal from "../../../components/Modal";
import ThumbnailEditor from "../../../components/ThumbnailEditor";

import useGetImage from "../../../hooks/useGetImage";

import NoAvatar from "../../../assets/icons/no-avatar.svg";

import styles from "./ProfilePicture.module.scss";
import useCurrentUser from "../../../hooks/useCurrentUser";

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
  const { currentUser } = useCurrentUser();
  const { data: avatarImgSrc } = useGetImage(
    isSelf ? currentUser?.avatar : avatar
  );

  const [msgShow, setMsgShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleEditPic = () => {
    setShowModal(true);
  };

  if (isSelf === true) {
    return (
      <>
        <div className={styles.MyPicBox} onClick={handleEditPic}>
          <ProPic
            avatarImgSrc={avatarImgSrc}
            msgShow={msgShow}
            setMsgShow={setMsgShow}
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
          <ThumbnailEditor
            origImage={avatarImgSrc}
            boxHeight={220}
            boxWidth={220}
            boxRadius={110}
            handleClose={() => setShowModal(false)}
          />
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
