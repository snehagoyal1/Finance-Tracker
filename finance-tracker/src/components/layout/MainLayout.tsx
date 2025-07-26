import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div className={styles.mainContent}>
                <Navbar onMenuClick={toggleSidebar} />
                <main className={styles.pageContent}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;