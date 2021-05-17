import React from "react";

import TopSection from "./TopSection";
import SavedSearchSidebar from "./SavedSearchesSidebar";

import styles from "./Layout.module.scss";
import FootBar from "./FootBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.Layout}>
      <TopSection />
      {children}
      <SavedSearchSidebar />
      <FootBar />
    </div>
  );
}

export default Layout;
