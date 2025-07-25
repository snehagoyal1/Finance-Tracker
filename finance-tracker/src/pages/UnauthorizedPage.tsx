import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UtilityPage.module.css';

const UnauthorizedPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>403</h1>
            <p className={styles.message}>You are not authorized to view this page.</p>
            <Link to="/dashboard" className={styles.link}>Go to Dashboard</Link>
        </div>
    );
};
export default UnauthorizedPage;