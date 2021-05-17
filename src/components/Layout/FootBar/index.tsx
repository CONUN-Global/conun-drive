import React from "react";
import useGetAppVersion from "../../../hooks/useGetAppVersion";
import useGetLatestRelease from "../../../hooks/useGetLatestRelease";
import styles from "./FootBar.module.scss";

function FootBar() {
  const { version: currentAppVersion } = useGetAppVersion();
  const { latestVersion } = useGetLatestRelease();

  return (
    <div className={styles.FootBar}>
      {currentAppVersion && (
        <>
          <span className={styles.CurrentVersion}>
            VERSION {currentAppVersion}
          </span>
          {currentAppVersion !== latestVersion ? (
            <span className={styles.UpdateStatus}>
              A new version is available!
            </span>
          ) : (
            <span className={styles.UpdateStatus}>All up-to-date!</span>
          )}
        </>
      )}
    </div>
  );
}

export default FootBar;
