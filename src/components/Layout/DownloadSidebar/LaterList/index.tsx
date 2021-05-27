import React from "react";

import ListItem from "./ListItem";

import styles from "./LaterList.module.scss";

function LaterList() {
  const fakeList = new Array(16).fill({ title: "fake" });

  return (
    <div className={styles.LaterList}>
      <p className={styles.Title}>Saved for later</p>
      <div className={styles.ListContainer}>
        {fakeList?.length > 0 ? (
          fakeList.map((item) => <ListItem key={item.name} name={item.title} />)
        ) : (
          <div className={styles.NoItems}>List Is Empty</div>
        )}
      </div>
    </div>
  );
}

export default LaterList;
