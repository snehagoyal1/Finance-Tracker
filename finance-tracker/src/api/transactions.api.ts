import apiClient from './axios';

export interface Transaction {
    id?: number;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    date: string; // YYYY-MM-DD
    categoryId: number;
}

export const getTransactions = () => apiClient.get<Transaction[]>('/transactions');
export const addTransaction = (data: Transaction) => apiClient.post<Transaction>('/transactions', data);
export const updateTransaction = (id: number, data: Partial<Transaction>) => apiClient.put<Transaction>(`/transactions/${id}`, data);
export const deleteTransaction = (id: number) => apiClient.delete(`/transactions/${id}`);