import React from "react";
import { useQuery } from "react-query";

import styles from "./Description.module.scss";

const { api } = window;

function Description({ descriptionHash }: { descriptionHash: string }) {
  const { data, error } = useQuery(
    ["get-description", descriptionHash],
    async () => {
      const data = await api.getFileDescription(descriptionHash);
      console.log(data);
      const description = new TextDecoder("utf-8").decode(data?.description);
      console.log("Decoded: ", description);
      return description;
    },
    {
      enabled: !!descriptionHash,
    }
  );

  console.log(data, "data");
  console.log(error, "error");

  return (
    <div className={styles.ItemDescription}>
      <div className={styles.BoxTitle}>Description</div>
      <div className={styles.DescriptionText}>{data && data}</div>
    </div>
  );
}

export default Description;
