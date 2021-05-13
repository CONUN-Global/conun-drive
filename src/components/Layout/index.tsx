import React from "react";

import TopSection from "./TopSection";
import SavedSearchSidebar from "./SavedSearchesSidebar";

import styles from "./Layout.module.scss";
import {useAppContext} from "../AppContext";
import Spinner from "../Spinner";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    const { isIpfsConnected } = useAppContext();

    return (
        <div className={styles.Layout}>

                    <TopSection />
                    {children}
                    <SavedSearchSidebar />
        </div>
    );
}

export default Layout;
