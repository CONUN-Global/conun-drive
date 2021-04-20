import React from "react";

import Button from "../../../../components/Button";

import styles from "./UserDetails.module.scss";
import CopyIcon from "../../../../assets/icons/copy.svg";
import NoAvatar from "../../../../assets/icons/no-avatar.svg";

function trunc(hash: string) {
  if (hash.length > 16) {
    return hash.slice(0, 16) + "...";
  } else {
    return hash;
  }
}

function Avatar({ avatar }: { avatar: string }) {
  if (avatar) {
    return <img src={avatar} className={styles.Avatar} />;
  } else {
    return <NoAvatar className={styles.Avatar} />;
  }
}

function UserDetails({
  walletAddress,
  avatar,
}: {
  walletAddress: string;
  avatar: string;
}) {
  return (
    <div className={styles.UserDetails}>
      <Avatar avatar={avatar} />
      <div className={styles.Text}>
        <div className={styles.IDBits}>
          <div className={styles.Label}>ID</div>
          <div className={styles.IDHash}>
            {walletAddress && trunc(walletAddress)}
          </div>
          <div className={styles.CopyBtn}>
            <Button noStyle>
              <CopyIcon className={styles.CopyIcon} />
            </Button>
          </div>
        </div>
        {/* Follow btn goes here later */}
      </div>
    </div>
  );
}
export default UserDetails;
