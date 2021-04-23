import React, { useRef, useState } from "react";
import useGetImage from "../../../hooks/useGetImage";

import NoAvatar from "../..//../assets/icons/no-avatar.svg";

import styles from "./ProfilePicture.module.scss";

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

function ProfilePicture({ avatar }: { avatar: string }) {
  const inputRef = useRef(null);

  const { data: avatarImgSrc } = useGetImage(avatar);

  const [msgShow, setMsgShow] = useState<boolean>(false);
  function handleEditPic() {
    inputRef.current.click();
  }

  return (
    <div className={styles.PicBox}>
      <ProPic
        avatarImgSrc={avatarImgSrc}
        handleEditPic={handleEditPic}
        setMsgShow={setMsgShow}
      >
        <span
          className={styles.EditMsg}
          style={{ visibility: msgShow ? "visible" : "hidden" }}
        >
          Change Profile Pic
        </span>
      </ProPic>
      <input type="file" ref={inputRef} style={{ display: "none" }} />
    </div>
  );
}

export default ProfilePicture;
