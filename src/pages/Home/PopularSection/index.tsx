import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import Category from "./Category";

import styles from "./PopularSection.module.scss";

const { api } = window;

function PopularSection() {
  const { data } = useQuery("get-all-categories", async () => {
    const { data } = await api.getCategories();

    return data;
  });

  return (
    <div className={styles.PopularSection}>
      {data?.data?.map((category) => (
        <div key={category.id} className={styles.Section}>
          <p className={styles.Title}>
            Popular in{" "}
            <Link
              className={styles.CategoryLink}
              to={`/category/${category?.id}?name=${category?.name}`}
            >
              {category?.name}
            </Link>
          </p>
          <Category categoryId={category.id} />
        </div>
      ))}
    </div>
  );
}

export default PopularSection;
