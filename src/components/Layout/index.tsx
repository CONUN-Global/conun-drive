import React from "react";
import { motion } from "framer-motion";

import DownloadSidebar from "./DownloadSidebar";
import TopSection from "./TopSection";
import SavedSearchSidebar from "./SavedSearchesSidebar";
import FootBar from "./FootBar";

import { useAppContext } from "../AppContext";

import useCurrentUser from "../../hooks/useCurrentUser";

import styles from "./Layout.module.scss";
import NoUserPage from "./NoUserPage";

const variants = {
  contained: { marginLeft: 201 },
  full: { marginLeft: 15 },
};

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isDownloadsOpen } = useAppContext();
  const { currentUser, isLoading } = useCurrentUser();
  return (
    <>
      {!isLoading && !currentUser?.id ? (
        <NoUserPage />
      ) : (
        <>
          <DownloadSidebar />
          <motion.div
            className={styles.Layout}
            initial="contained"
            animate={isDownloadsOpen ? "contained" : "full"}
            variants={variants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <TopSection />
            {children}
            <SavedSearchSidebar />
            <FootBar />
          </motion.div>
        </>
      )}
    </>
  );
}

export default Layout;
