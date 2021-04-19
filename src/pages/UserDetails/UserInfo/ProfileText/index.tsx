import React from "react";

import styles from "./ProfileText.module.scss";
import CopyIcon from "../../../../assets/icons/copy.svg";

export default function ProfileText() {
  return (
    <div className={styles.ProfileText}>
      <div className={styles.IDPart}>
        <div className={styles.Label}>ID</div>
        <div className={styles.Hash}>
          0x3AbDBFF0cD06b88d0Bc95C9fc650Dd31d2899FBB
        </div>
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
