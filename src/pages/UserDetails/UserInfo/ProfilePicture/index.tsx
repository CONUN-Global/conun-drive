import React, { useRef, useState } from "react";

import styles from "./ProfilePicture.module.scss";

const bkImg = "none";

export default function UserInfo() {
  const inputRef = useRef(null);

  const [msgShow, setMsgShow] = useState<boolean>(false);
  function handleEditPic() {
    inputRef.current.click();
  }

  return (
    <div className={styles.PicBox}>
      <div
        className={styles.ProPic}
        style={{ backgroundImage: bkImg }}
        onClick={() => handleEditPic()}
        onMouseEnter={() => {
          setMsgShow(true);
        }}
        onMouseLeave={() => {
          setMsgShow(false);
        }}
      >
        <span
          className={styles.EditMsg}
          style={{ visibility: msgShow ? "visible" : "hidden" }}
        >
          Change Profile Pic
        </span>
      </div>
      <input type="file" ref={inputRef} style={{ display: "none" }} />
    </div>
  );
}
