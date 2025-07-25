import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Navbar />
                <main className={styles.pageContent}>{children}</main>
            </div>
        </div>
    );
};
export default MainLayout;