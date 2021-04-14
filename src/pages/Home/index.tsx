import React from "react";
import { Link } from "react-router-dom";

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
        {/* Test Porpoises */}
        <div>
          <Link to={"/file/placeholder"}>File Details</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
