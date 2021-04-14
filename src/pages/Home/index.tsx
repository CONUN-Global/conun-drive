import React from "react";

import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.TrendingAndInterests}>
        <div className={styles.Trending}>
          <span>Trending</span>
        </div>
        <div className={styles.Interests}>
          <span>My Interests</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
