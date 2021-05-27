import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import Button from "../../components/Button";

import styles from "./Thumbnail.module.scss";

type ShareProps = {
  name: string;
  hash: string;
};

type Props = {
  imgSrc: string;
  className: string;
  share?: ShareProps;
  link?: string;
};

function HandleListAdd(share: ShareProps) {
  console.log("Added: ", share);
}

function ListButton({ share }: { share: ShareProps }) {
  return (
    <Button
      className={styles.ShareButton}
      noStyle
      onClick={() => HandleListAdd(share)}
    >
      <span>pic</span>
    </Button>
  );
}

function Thumbnail({ imgSrc, className, share, link }: Props) {
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
        {!share && <ListButton share={share} />}
      </div>
    );
  }
  return (
    <div className={classNames(className, styles.NoImage)}>
      No peers available
    </div>
  );
}

export default Thumbnail;
