import React from "react";

import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.Home}>
      <input type="text" />
      <div>
        <div>
          <span>Trending</span>
        </div>
        <div>
          <span>My Interests</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
