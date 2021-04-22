import React from "react";
import { Link } from "react-router-dom";

import Button from "../../Button";
import SearchBar from "./SearchBar";

import AddIcon from "../../../assets/icons/add.svg";
import SaveSearchIcon from "../../../assets/icons/save-search.svg";

import styles from "./TopSection.module.scss";

function TopSection() {
  return (
    <div className={styles.TopSection}>
      <div className={styles.UserAndSearchBar}>
        <img
          className={styles.UserPicture}
          src="https://i.pravatar.cc/300"
          alt="user profile"
        />
        <SearchBar />
      </div>
      <div className={styles.ActionsBar}>
        <Link className={styles.ActionButtonAdd} to="/file-upload">
          <AddIcon className={styles.Icon} />
        </Link>
        <Button className={styles.ActionButton} variant="grey">
          <span className={styles.OnlineCircle} /> 44.000 Peers Online
        </Button>
        <Button className={styles.ActionButton} variant="grey">
          <SaveSearchIcon className={styles.Icon} />
        </Button>
      </div>
    </div>
  );
}

export default TopSection;
