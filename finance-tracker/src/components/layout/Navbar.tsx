import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <button className={styles.menuButton} onClick={onMenuClick}>
                    ☰
                </button>
                <div className={styles.brand}>FinanceTracker</div>
            </div>
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