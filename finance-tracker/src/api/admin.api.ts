// src/api/admin.api.ts

import apiClient from './axios';
import { Transaction } from './transactions.api'; // Import Transaction type

export interface AdminUserView {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'read-only';
    createdAt: string;
}

export const getAllUsers = () => {
    return apiClient.get<AdminUserView[]>('/users');
};

// --- NEW FUNCTION ---
/**
 * Fetches all transactions for a specific user. (Admin only)
 * @param userId The ID of the user whose transactions to fetch.
 */
export const getTransactionsForUser = (userId: string) => {
    return apiClient.get<Transaction[]>(`/users/${userId}/transactions`);
};
