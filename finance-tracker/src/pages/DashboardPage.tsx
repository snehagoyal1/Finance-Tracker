import React, { useState, useEffect, useCallback } from 'react';
import { getAnalytics, AnalyticsData, Period } from '../api/analytics.api';
import SummaryCharts from '../components/charts/SummaryCharts';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [period, setPeriod] = useState<Period>('30days');

    // Use useCallback to memoize the fetch function
    const fetchAnalytics = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAnalytics(period);
            setAnalytics(response.data);
        } catch (err) {
            setError('Failed to fetch analytics data.');
        } finally {
            setLoading(false);
        }
    }, [period]); // Re-create this function only if the period changes

    useEffect(() => {
        // Fetch data on initial load and when the period changes
        fetchAnalytics();

        // Add an event listener to re-fetch data when the window gains focus
        window.addEventListener('focus', fetchAnalytics);

        // Cleanup: remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('focus', fetchAnalytics);
        };
    }, [fetchAnalytics]); // The effect now depends on the memoized fetchAnalytics function

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <div className={styles.periodControls}>
                    <button onClick={() => setPeriod('30days')} className={period === '30days' ? styles.activeButton : styles.periodButton}>Last 30 Days</button>
                    <button onClick={() => setPeriod('monthly')} className={period === 'monthly' ? styles.activeButton : styles.periodButton}>This Month</button>
                    <button onClick={() => setPeriod('yearly')} className={period === 'yearly' ? styles.activeButton : styles.periodButton}>This Year</button>
                </div>
            </div>

            {loading && <p>Loading dashboard...</p>}
            {error && <p className={styles.error}>{error}</p>}
            
            {analytics && !loading && !error && (
                <SummaryCharts data={analytics} />
            )}
        </div>
    );
};

export default DashboardPage;
