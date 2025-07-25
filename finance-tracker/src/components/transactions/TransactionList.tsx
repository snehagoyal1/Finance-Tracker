import React from 'react';
import { Transaction } from '../../api/transactions.api';
import TransactionItem from './TransactionItem';
import { FixedSizeList as List } from 'react-window';
import styles from './TransactionList.module.css';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: number) => void;
    canModify: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, canModify }) => {
    if (transactions.length === 0) {
        return <p>No transactions found.</p>;
    }

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const transaction = transactions[index];
        return (
            <div style={style}>
                <TransactionItem
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    canModify={canModify}
                />
            </div>
        );
    };

    return (
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <div>Date</div>
                <div>Description</div>
                <div>Category</div>
                <div>Type</div>
                <div>Amount</div>
                {canModify && <div>Actions</div>}
            </div>
            
            <List
                height={600}
                itemCount={transactions.length}
                itemSize={65}
                width="100%"
            >
                {Row}
            </List>
        </div>
    );
};

export default TransactionList;