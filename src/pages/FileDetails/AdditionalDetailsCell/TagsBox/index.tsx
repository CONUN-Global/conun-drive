import React from "react";

import styles from "./TagsBox.module.scss";

function TagsBox() {
  const testTags = [
    "painting",
    "helicopter",
    "waterslide",
    "normalcy",
    "turbulence",
  ];

  return (
    <div className={styles.TagsBox}>
      {testTags &&
        testTags.map((tag) => (
          <span key={tag} className={styles.Tag}>
            {tag}
          </span>
        ))}
    </div>
  );
}

export default TagsBox;
