
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

export const getAllUsers = () => {
    return apiClient.get<AdminUserView[]>('/users');
};

export const getTransactionsForUser = (userId: string) => {
    return apiClient.get<Transaction[]>(`/users/${userId}/transactions`);
};

// --- NEW FUNCTION ---
/**
 * Updates the role of a specific user. (Admin only)
 * @param userId The ID of the user to update.
 * @param role The new role to assign.
 */
export const updateUserRole = (userId: number, role: UserRole) => {
    return apiClient.put(`/users/${userId}/role`, { role });
};