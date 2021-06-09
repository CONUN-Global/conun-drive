import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router";
import { Waypoint } from "react-waypoint";

import FileBox from "../../components/FileBox";
import Spinner from "../../components/Spinner";

import useUrlQuery from "../../hooks/useUrlQuery";

import { mainPageAnimation } from "../../anim";

import { FileProps } from "../../types";

import styles from "./Category.module.scss";

const { api } = window;

const PAGE_LIMIT = 18;

function Category() {
  const { id } = useParams();

  const page = useRef(1);
  const total = useRef(0);

  const query = useUrlQuery();

  const {
    data: files,
    fetchNextPage,
    isLoading,
    remove,
  } = useInfiniteQuery(
    ["category", id],
    async ({ pageParam = page.current }) => {
      const { data } = await api.getContentBy([
        { name: "category_id", value: id },
        { name: "order_by", value: "rate" },
        { name: "limit", value: String(PAGE_LIMIT) },
        { name: "page", value: pageParam },
      ]);
      total.current = data?.data?.total;
      page.current = page?.current + 1;

      return data.data;
    },
    {
      getNextPageParam() {
        if (page.current + 1 * PAGE_LIMIT < total.current) {
          return page.current;
        }
        return undefined;
      },
      enabled: !!id,
      refetchOnMount: "always",
    }
  );

  useEffect(() => {
    if (page.current !== 1) {
      remove();
      page.current = 1;
    }
  }, [id]);

  const categoryName = query.get("name");

  return (
    <motion.div
      className={styles.Category}
      variants={mainPageAnimation}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <p className={styles.Title}>{categoryName}</p>
      <div className={styles.ResultsContainer}>
        {(files?.pages || []).map((group, i) => (
          <React.Fragment key={i}>
            {group?.data?.map((file: FileProps) => (
              <div key={file.id} className={styles.Cell}>
                <FileBox file={file} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isLoading && <Spinner />}
      {!isLoading && !files?.pages?.[0]?.data && (
        <p className={styles.NoResults}>No results</p>
      )}

      {!isLoading && (
        <Waypoint bottomOffset="-20%" onEnter={() => fetchNextPage()} />
      )}
    </motion.div>
  );
}

export default Category;
