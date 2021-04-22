import React from "react";

import styles from "./ProfileText.module.scss";
import CopyIcon from "../../../assets/icons/copy.svg";

export default function ProfileText({
  authorID,
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
        <div className={styles.CopyBtn}>
          <CopyIcon className={styles.CopyIcon} />
        </div>
      </div>
      <div className={styles.About}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        luctus urna ac sapien bibendum, ut tristique sapien cursus. Aenean
        maximus est ac volutpat accumsan. Nulla sit amet metus erat. Mauris
        pretium viverra lorem, ut ullamcorper tortor ornare eu.
      </div>
    </div>
  );
}
