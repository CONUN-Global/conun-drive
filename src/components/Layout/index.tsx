import React from "react";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className={styles.Layout}>{children}</div>;
}

export default Layout;
