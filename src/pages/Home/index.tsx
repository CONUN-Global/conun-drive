import React from "react";

import PopularSection from "./PopularSection";

import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.TrendingAndInterests}>
        <div className={styles.Trending}>
          <span className={styles.Title}>Trending</span>
        </div>
        <div className={styles.Interests}>
          <span className={styles.Title}>My Interests</span>
        </div>
      </div>
      <PopularSection />
    </div>
  );
}

export default Home;
