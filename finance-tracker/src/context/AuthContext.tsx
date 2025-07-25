import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import apiClient from '../api/axios';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'read-only';
    token: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, userData: Omit<User, 'token'>) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData: User = JSON.parse(storedUser);
            setUser(userData);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        }
        setIsLoading(false);
    }, []);

    const login = (token: string, userData: Omit<User, 'token'>) => {
        const fullUserData = { ...userData, token };
        localStorage.setItem('user', JSON.stringify(fullUserData));
        setUser(fullUserData);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        delete apiClient.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};