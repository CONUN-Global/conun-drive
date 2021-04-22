import React from "react";
import { useLocation } from "react-router";

import styles from "./Search.module.scss";

function Search() {
  const location = useLocation();

  return <div className={styles.Search}></div>;
}

export default Search;
