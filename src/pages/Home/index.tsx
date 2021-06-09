import React from "react";
import { motion } from "framer-motion";

import PopularSection from "./PopularSection";

import { mainPageAnimation } from "../../anim";

import styles from "./Home.module.scss";

function Home() {
  return (
    <motion.div
      className={styles.Home}
      variants={mainPageAnimation}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <div className={styles.TrendingAndInterests}></div>
      <PopularSection />
    </motion.div>
  );
}

export default Home;
