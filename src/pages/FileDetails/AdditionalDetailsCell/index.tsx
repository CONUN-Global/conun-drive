import React from "react";

import UserDetails from "./UserDetails";
import Description from "./Description";
import TagsBox from "./TagsBox";

import styles from "./AdditionalDetailsCell.module.scss";
import { FileProps } from "../../../types";

interface DetailsProps {
  file: FileProps;
}

function AdditionalDetailsCell({ file }: DetailsProps) {
  return (
    <div className={styles.Cell}>
      <UserDetails
        walletAddress={file?.user.wallet_id}
        avatar={file?.user.avatar}
      />
      <Description descriptionHash={file?.info.description} />
      <TagsBox />
    </div>
  );
}

export default AdditionalDetailsCell;
