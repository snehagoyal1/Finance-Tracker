import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    Transaction
} from '../api/transactions.api';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import styles from './TransactionsPage.module.css';

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for the modal and editing
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    
    // State for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

    const { user } = useAuth(); // Get the current user from context

    // Determine if the user has permission to modify transactions
    const canModify = user?.role === 'user' || user?.role === 'admin';

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getTransactions();
            setTransactions(response.data);
        } catch (err) {
            setError('Failed to fetch transactions.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Use useMemo to efficiently filter transactions
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || transaction.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [transactions, searchTerm, filterType]);

    const handleOpenModal = useCallback((transaction: Transaction | null = null) => {
        if (!canModify) return; // Prevent opening modal for read-only users
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    }, [canModify]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    }, []);

    const handleFormSubmit = useCallback(async (data: Transaction) => {
        try {
            if (editingTransaction && data.id) {
                await updateTransaction(data.id, data);
            } else {
                await addTransaction(data);
            }
            fetchTransactions();
            handleCloseModal();
        } catch (err) {
            console.error("Failed to save transaction", err);
        }
    }, [editingTransaction, fetchTransactions, handleCloseModal]);
    
    const handleDelete = useCallback(async (id: number) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await deleteTransaction(id);
                fetchTransactions();
            } catch (err) {
                console.error("Failed to delete transaction", err);
            }
        }
    }, [fetchTransactions]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Transactions</h1>
                {/* Conditionally render the "Add Transaction" button */}
                {canModify && (
                    <button onClick={() => handleOpenModal()} className={styles.addButton}>
                        Add Transaction
                    </button>
                )}
            </div>

            {/* Filter and Search Controls */}
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search by description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className={styles.filterSelect}
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            {loading && <p>Loading transactions...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                <TransactionList
                    transactions={filteredTransactions}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                    canModify={canModify} // Pass permission down
                />
            )}

            {/* The modal will only open if canModify is true */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            >
                <TransactionForm
                    onSubmit={handleFormSubmit}
                    initialData={editingTransaction}
                />
            </Modal>
        </div>
    );
};

export default TransactionsPage;
