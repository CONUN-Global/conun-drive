import React from "react";
import { useQuery } from "react-query";

import FilesHorizontalViewer from "../../../components/FilesHorizontalViewer";

import instance from "../../../axios/instance";

import styles from "./PopularSection.module.scss";

function PopularSection() {
  const { data } = useQuery("get-all-categories", async () => {
    const { data } = await instance.get("/cate/get_all");

    return data;
  });

  return (
    <div className={styles.PopularSection}>
      {data?.data?.map((category) => (
        <div key={category.id} className={styles.Section}>
          <p className={styles.Title}>
            Popular in <span>{category?.name}</span>
          </p>
          <FilesHorizontalViewer category={category.id} />
        </div>
      ))}
    </div>
  );
}

export default PopularSection;
