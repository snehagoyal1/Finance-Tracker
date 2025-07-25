// src/components/layout/Navbar.tsx

import React from 'react';
import { useAuth } from '../../context/AuthContext'; // <-- THIS LINE WAS MISSING
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>FinanceTracker</div>
            <div className={styles.userInfo}>
                <button onClick={toggleTheme} className={styles.themeButton}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <span>Welcome, {user?.name}</span>
                <button onClick={logout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;