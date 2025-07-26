import apiClient from './axios';
import { Transaction } from './transactions.api';

export interface AdminUserView {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'read-only';
    createdAt: string;
}

export type UserRole = 'user' | 'admin' | 'read-only';

// --- NEW TYPE ---
export interface CacheStats {
    hits: number;
    misses: number;
}

export const getAllUsers = () => {
    return apiClient.get<AdminUserView[]>('/users');
};

export const getTransactionsForUser = (userId: string) => {
    return apiClient.get<Transaction[]>(`/users/${userId}/transactions`);
};

export const updateUserRole = (userId: number, role: UserRole) => {
    return apiClient.put(`/users/${userId}/role`, { role });
};

// --- NEW FUNCTIONS ---
/**
 * Fetches cache performance statistics. (Admin only)
 */
export const getCacheStats = () => {
    return apiClient.get<CacheStats>('/admin/cache-stats');
};

/**
 * Resets cache performance statistics. (Admin only)
 */
export const resetCacheStats = () => {
    return apiClient.delete('/admin/cache-stats');
};