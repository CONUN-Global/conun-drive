import React from "react";

import Button from "../../../../Button";

import CloseIcon from "../../../../../assets/icons/close.svg";

import styles from "./ListItem.module.scss";

type Download = {
  name: string;
  handleDelete: () => void;
};

function ListItem({ name, handleDelete }: Download) {
  return (
    <div className={styles.ItemContainer}>
      <div className={styles.Item}>
        <Button className={styles.ItemButton} noStyle>
          <p className={styles.Title}>{name}</p>
        </Button>
      </div>

      <Button className={styles.DeleteButton} noStyle onClick={handleDelete}>
        <CloseIcon className={styles.DeleteIcon} />
      </Button>
    </div>
  );
}

export default ListItem;