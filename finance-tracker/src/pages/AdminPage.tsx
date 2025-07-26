// src/pages/AdminPage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserRole, AdminUserView, UserRole } from '../api/admin.api';
import styles from './AdminPage.module.css';

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<AdminUserView[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users. You may not have admin privileges.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUserClick = (e: React.MouseEvent, userId: number, userName: string) => {
        // Prevent navigation if the click was on the dropdown
        if ((e.target as HTMLElement).tagName === 'SELECT') {
            return;
        }
        navigate(`/admin/user/${userId}/transactions`, { state: { userName } });
    };

    // --- NEW FUNCTION ---
    const handleRoleChange = async (userId: number, newRole: UserRole) => {
        try {
            await updateUserRole(userId, newRole);
            // Update the user's role in the local state for an immediate UI update
            setUsers(currentUsers =>
                currentUsers.map(user =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (err) {
            console.error("Failed to update user role", err);
            // Optionally, show an error message to the admin
        }
    };

    if (loading) return <p>Loading admin data...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Panel - User Management</h1>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} onClick={(e) => handleUserClick(e, user.id, user.name)} className={styles.clickableRow}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {/* --- UPDATED ROLE DISPLAY --- */}
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                        className={styles.roleSelect}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="read-only">Read-Only</option>
                                    </select>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;