import { motion } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { catAnimation } from "../../../anim";
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
        <motion.div
          key={category.id}
          className={styles.Section}
          variants={catAnimation}
        >
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
        </motion.div>
      ))}
    </div>
  );
}

export default PopularSection;
