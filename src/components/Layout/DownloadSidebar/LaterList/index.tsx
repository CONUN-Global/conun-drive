import React from "react";

import ListItem from "./ListItem";

import useGetLaterList from "../../../../hooks/useGetLaterList";
import useUpdateLaterList from "../../../../hooks/useUpdateLaterList";

import styles from "./LaterList.module.scss";

function LaterList() {
  const { list, refetch } = useGetLaterList();
  const { updateList } = useUpdateLaterList();

  const handleDelete = async (hash: string) => {
    await updateList(list.filter((i) => i.hash !== hash));
    refetch();
  };

  return (
    <div className={styles.LaterList}>
      <p className={styles.Title}>Saved for later</p>
      <div className={styles.ListContainer}>
        {list?.length > 0 ? (
          list?.map((item) => (
            <ListItem
              key={item.hash}
              name={item.name}
              handleDelete={() => handleDelete(item.hash)}
            />
          ))
        ) : (
          <div className={styles.NoItems}>List Is Empty</div>
        )}
      </div>
    </div>
  );
}

export default LaterList;
