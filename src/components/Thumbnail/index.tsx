import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { toast } from "react-toastify";

import Button from "../../components/Button";

import AddIcon from "../../assets/icons/addToList.svg";

import styles from "./Thumbnail.module.scss";
import useUpdateLaterList from "../../hooks/useUpdateLaterList";
import useGetLaterList from "../../hooks/useGetLaterList";

type ListProps = {
  name: string;
  hash: string;
};

type Props = {
  imgSrc: string;
  className: string;
  listDetails?: ListProps;
  link?: string;
};

function ListButton({ listDetails }: { listDetails: ListProps }) {
  const { list, refetch } = useGetLaterList();
  const { updateList } = useUpdateLaterList();

  const HandleListAdd = async (listDetails: ListProps) => {
    await updateList([...list, listDetails]);

    toast.success(`File "${listDetails.name}" added to 'Saved for later'!`, {
      autoClose: 1500,
      position: "bottom-center",
    });
    refetch();
  };

  return (
    <Button
      className={styles.ShareButton}
      noStyle
      onClick={() => HandleListAdd(listDetails)}
    >
      <AddIcon className={styles.Icon} />
    </Button>
  );
}

function Thumbnail({ imgSrc, className, listDetails, link }: Props) {
  if (imgSrc) {
    return (
      <div className={classNames(className, styles.Container)}>
        {link ? (
          <Link to={link}>
            <img className={styles.Image} src={imgSrc} />
          </Link>
        ) : (
          <img className={styles.Image} src={imgSrc} />
        )}
        {listDetails && <ListButton listDetails={listDetails} />}
      </div>
    );
  }
  return (
    <div className={classNames(className, styles.NoImage, styles.Container)}>
      No peers available
      {listDetails && <ListButton listDetails={listDetails} />}
    </div>
  );
}

export default Thumbnail;
