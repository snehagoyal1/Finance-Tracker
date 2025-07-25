import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getTransactionsForUser } from '../api/admin.api';
import { updateTransaction, deleteTransaction, Transaction } from '../api/transactions.api';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import styles from './TransactionsPage.module.css';

const UserTransactionsPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation();
    const userName = location.state?.userName;

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    const fetchUserTransactions = useCallback(async () => {
        if (!userId) return;
        try {
            setLoading(true);
            const response = await getTransactionsForUser(userId);
            setTransactions(response.data);
        } catch (err) {
            setError(`Failed to fetch transactions for user ${userId}.`);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserTransactions();
    }, [fetchUserTransactions]);

    const handleOpenModal = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    const handleFormSubmit = async (data: Transaction) => {
        if (!editingTransaction || !data.id) return;
        try {
            await updateTransaction(data.id, data);
            fetchUserTransactions();
            handleCloseModal();
        } catch (err) {
            console.error("Failed to update transaction", err);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await deleteTransaction(id);
                fetchUserTransactions();
            } catch (err) {
                console.error("Failed to delete transaction", err);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Managing Transactions for {userName || `User #${userId}`}</h1>
            
            {loading && <p>Loading transactions...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                <TransactionList
                    transactions={transactions}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                    canModify={true}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Edit User Transaction"
            >
                <TransactionForm
                    onSubmit={handleFormSubmit}
                    initialData={editingTransaction}
                />
            </Modal>
        </div>
    );
};

export default UserTransactionsPage;
