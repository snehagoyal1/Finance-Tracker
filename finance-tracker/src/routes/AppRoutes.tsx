import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- FIX: 'Routes' was missing here
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

// Lazy load the page components
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const TransactionsPage = lazy(() => import('../pages/TransactionsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const UserTransactionsPage = lazy(() => import('../pages/UserTransactionsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading Page...</div>}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout><DashboardPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <MainLayout><DashboardPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <MainLayout><TransactionsPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <MainLayout><AdminPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/user/:userId/transactions"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <MainLayout><UserTransactionsPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
