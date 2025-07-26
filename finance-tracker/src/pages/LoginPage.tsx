import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // No longer need useLocation
import styles from '../components/common/Form.module.css';
import { loginUser } from '../api/auth.api';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState<'user' | 'admin'>('user');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password });
            const { token, ...userData } = response.data;

            if (loginType === 'admin' && userData.role !== 'admin') {
                setError('Access Denied: You do not have admin privileges.');
                return;
            }

            login(token, userData);
            
            // --- THIS IS THE FIX ---
            // Always navigate to the dashboard after a successful login.
            navigate('/dashboard', { replace: true });
            
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.loginTypeToggle}>
                    <button
                        type="button"
                        className={`${styles.toggleButton} ${loginType === 'user' ? styles.activeToggle : ''}`}
                        onClick={() => setLoginType('user')}
                    >
                        User Login
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleButton} ${loginType === 'admin' ? styles.activeToggle : ''}`}
                        onClick={() => setLoginType('admin')}
                    >
                        Admin Login
                    </button>
                </div>

                <h2 className={styles.formTitle}>
                    {loginType === 'user' ? 'Welcome Back' : 'Admin Portal'}
                </h2>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="you@example.com"
                        autoComplete="email"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="••••••••"
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className={styles.button}>Log In</button>
                {error && <p className={styles.errorMessage}>{error}</p>}
                
                {loginType === 'user' && (
                    <p className={styles.linkText}>
                        Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPage;