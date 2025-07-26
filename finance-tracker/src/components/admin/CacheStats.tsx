import React, { useState, useEffect, useCallback } from 'react';
import { getCacheStats, resetCacheStats, CacheStats as CacheStatsType } from '../../api/admin.api';
import styles from './CacheStats.module.css';

const CacheStats: React.FC = () => {
    const [stats, setStats] = useState<CacheStatsType | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getCacheStats();
            setStats(response.data);
        } catch (err) {
            console.error('Failed to fetch cache stats.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleReset = async () => {
        if (window.confirm('Are you sure? This will reset hit/miss counters to zero.')) {
            await resetCacheStats();
            fetchStats();
        }
    };

    const total = (stats?.hits || 0) + (stats?.misses || 0);
    const hitRate = total === 0 ? 0 : ((stats?.hits || 0) / total) * 100;

    return (
        <div className={styles.statsContainer}>
            <h2 className={styles.title}>Caching Performance Metrics</h2>
            {loading ? <p>Loading stats...</p> : (
                <>
                    <div className={styles.metricsGrid}>
                        <div className={styles.metricCard}>
                            <div className={styles.metricLabel}>Cache Hits</div>
                            <div className={styles.metricValue}>{stats?.hits}</div>
                        </div>
                        <div className={styles.metricCard}>
                            <div className={styles.metricLabel}>Cache Misses</div>
                            <div className={styles.metricValue}>{stats?.misses}</div>
                        </div>
                        <div className={styles.metricCard}>
                            <div className={styles.metricLabel}>Hit Rate</div>
                            <div className={`${styles.metricValue} ${styles.hitRate}`}>
                                {hitRate.toFixed(1)}%
                            </div>
                        </div>
                    </div>
                    <div className={styles.controls}>
                        <button onClick={fetchStats} className={`${styles.button} ${styles.refreshButton}`}>Refresh</button>
                        <button onClick={handleReset} className={`${styles.button} ${styles.resetButton}`}>Reset Stats</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CacheStats;