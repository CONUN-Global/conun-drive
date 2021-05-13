import React from "react";

import Button from "../../../components/Button";
import CopyButton from "../../../components/CopyButton";

import CopyIcon from "../../../assets/icons/copy.svg";

import styles from "./ProfileText.module.scss";

export default function ProfileText({
  walletHash,
}: {
  authorID: string;
  walletHash: string;
}) {
  return (
    <div className={styles.ProfileText}>
      <div className={styles.IDPart}>
        <div className={styles.Label}>ID</div>
        <div className={styles.Hash}>{walletHash}</div>
        <CopyButton walletAdd={walletHash} />
      </div>
      {/* About Me text will go here when implemented */}
      <div className={styles.About}></div>
    </div>
  );
}
