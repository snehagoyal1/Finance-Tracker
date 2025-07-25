import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
    const { user } = useAuth(); // Get the current user

    return (
        <aside className={styles.sidebar}>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/transactions"
                            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                        >
                            Transactions
                        </NavLink>
                    </li>
                    
                    {/* Conditionally render the Admin link */}
                    {user?.role === 'admin' && (
                        <li>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
                            >
                                Admin Panel
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;