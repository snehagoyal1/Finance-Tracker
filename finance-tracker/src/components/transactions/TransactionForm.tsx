import React, { useState, useEffect } from 'react';
import { Transaction } from '../../api/transactions.api';
import styles from '../common/Form.module.css'; 

interface TransactionFormProps {
    onSubmit: (data: Transaction) => void;
    initialData?: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, initialData }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [categoryId, setCategoryId] = useState(1); // Default to first category

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
            setAmount(String(initialData.amount));
            setType(initialData.type);
            setDate(initialData.date);
            setCategoryId(initialData.categoryId);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            description,
            amount: parseFloat(amount),
            type,
            date,
            categoryId,
            id: initialData?.id
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Amount</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Type</label>
                <select value={type} onChange={e => setType(e.target.value as any)} className={styles.input}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Category</label>
                <select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} className={styles.input}>
                    {/* In a real app, you would fetch these categories from the API */}
                    <option value={1}>Salary</option>
                    <option value={2}>Food</option>
                    <option value={3}>Transport</option>
                    <option value={4}>Entertainment</option>
                    <option value={5}>Utilities</option>
                    <option value={6}>Health</option>
                    <option value={7}>Other</option>
                </select>
            </div>
            <button type="submit" className={styles.button}>
                {initialData ? 'Update' : 'Add'} Transaction
            </button>
        </form>
    );
};

export default TransactionForm;