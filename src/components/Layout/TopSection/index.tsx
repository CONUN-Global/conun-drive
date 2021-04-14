import React from "react";

import Button from "../../Button";

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
        <div className={styles.SearchBarContainer}>
          <input className={styles.SearchBar} type="text" />
          <Button noStyle className={styles.SaveButton}>
            Save Search
          </Button>
        </div>
      </div>
      <div className={styles.ActionsBar}>
        <Button className={styles.ActionButtonAdd} variant="grey">
          <AddIcon className={styles.Icon} />
        </Button>
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
