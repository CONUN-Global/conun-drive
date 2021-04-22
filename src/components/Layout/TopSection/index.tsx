import React from "react";
import { Link } from "react-router-dom";

import Button from "../../Button";

import AddIcon from "../../../assets/icons/add.svg";
import SaveSearchIcon from "../../../assets/icons/save-search.svg";
import NoAvatar from "../../../assets/icons/no-avatar.svg";

import styles from "./TopSection.module.scss";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useGetImage from "../../../hooks/useGetImage";

function TopSection() {
  const { currentUser } = useCurrentUser();
  const { data: avatarImgSrc } = useGetImage(currentUser?.avatar);

  return (
    <div className={styles.TopSection}>
      <div className={styles.UserAndSearchBar}>
        <Link to={`/user-details/${currentUser?.id}`}>
          {avatarImgSrc ? (
            <img
              className={styles.UserPicture}
              src={avatarImgSrc}
              alt="user profile"
            />
          ) : (
            <NoAvatar className={styles.UserPicture} />
          )}
        </Link>

        <div className={styles.SearchBarContainer}>
          <input className={styles.SearchBar} type="text" />
          <Button noStyle className={styles.SaveButton}>
            Save Search
          </Button>
        </div>
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
