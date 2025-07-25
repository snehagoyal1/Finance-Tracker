// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../components/common/Form.module.css';
import { loginUser } from '../api/auth.api'; // Correct function name is 'loginUser'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password });
            const { token, ...userData } = response.data;
            login(token, userData);
            navigate(from, { replace: true });
        } catch (err: any)
        {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Welcome Back</h2>
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
                    />
                </div>
                <button type="submit" className={styles.button}>Log In</button>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <p className={styles.linkText}>
                    Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
