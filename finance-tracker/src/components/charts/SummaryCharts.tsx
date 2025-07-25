
import React from 'react';
import {
    PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AnalyticsData } from '../../api/analytics.api';
import styles from './SummaryCharts.module.css';

interface SummaryChartsProps {
    data: AnalyticsData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const SummaryCharts: React.FC<SummaryChartsProps> = ({ data }) => {
    const incomeExpenseData = [
        { name: 'Total Income', value: data.totalIncome },
        { name: 'Total Expense', value: data.totalExpense },
    ];

    return (
        <>
            {/* New Line Chart for trends */}
            <div className={styles.chartContainerFull}>
                <h3 className={styles.chartTitle}>Income & Expense Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Income" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={styles.chartsGrid}>
                <div className={styles.chartContainer}>
                    <h3 className={styles.chartTitle}>Income vs Expense</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={incomeExpenseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.chartContainer}>
                    <h3 className={styles.chartTitle}>Expense by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.categoryBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="total"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.categoryBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default SummaryCharts;