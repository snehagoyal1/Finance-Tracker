import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} 
                onClick={onClose}
            ></div>
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                                onClick={onClose} // Close sidebar on link click
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/transactions"
                                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                                onClick={onClose}
                            >
                                Transactions
                            </NavLink>
                        </li>
                        
                        {user?.role === 'admin' && (
                            <li>
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                                    onClick={onClose}
                                >
                                    Admin Panel
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;