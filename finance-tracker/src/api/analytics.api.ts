// src/api/analytics.api.ts
import apiClient from './axios';

export type Period = '30days' | 'monthly' | 'yearly';

export interface TrendData {
    date: string;
    Income: number;
    Expense: number;
}

export interface AnalyticsData {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
    categoryBreakdown: { name: string; total: number }[];
    trends: TrendData[];
}

export const getAnalytics = (period: Period) => {
    return apiClient.get<AnalyticsData>(`/analytics?period=${period}`);
};