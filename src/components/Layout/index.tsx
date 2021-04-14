import React from "react";

import TopSection from "./TopSection";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.Layout}>
      <TopSection />
      {children}
    </div>
  );
}

export default Layout;
