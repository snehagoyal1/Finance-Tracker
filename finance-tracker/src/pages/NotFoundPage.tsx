import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UtilityPage.module.css';

const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Page Not Found</p>
            <Link to="/dashboard" className={styles.link}>Go to Dashboard</Link>
        </div>
    );
};
export default NotFoundPage;