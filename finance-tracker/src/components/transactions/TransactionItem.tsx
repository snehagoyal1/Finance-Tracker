import React from 'react';
import { Transaction } from '../../api/transactions.api';
import { formatDate, formatCurrency } from '../../utils/formatters';
import styles from './TransactionItem.module.css';

interface TransactionItemProps {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: number) => void;
    canModify: boolean;
}

const categoryMap: { [key: number]: string } = {
    1: 'Salary', 2: 'Food', 3: 'Transport', 4: 'Entertainment',
    5: 'Utilities', 6: 'Health', 7: 'Other'
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete, canModify }) => {
    return (
        <div className={styles.itemRow}>
            <div>{formatDate(transaction.date)}</div>
            <div>{transaction.description}</div>
            <div>{categoryMap[transaction.categoryId] || 'N/A'}</div>
            <div>
                <span className={`${styles.typeBadge} ${transaction.type === 'income' ? styles.income : styles.expense}`}>
                    {transaction.type}
                </span>
            </div>
            <div>{formatCurrency(transaction.amount)}</div>
            {canModify && (
                <div className={styles.actions}>
                    <button onClick={() => onEdit(transaction)} className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                    <button onClick={() => onDelete(transaction.id!)} className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default TransactionItem;