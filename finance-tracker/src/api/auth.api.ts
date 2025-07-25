// src/api/auth.api.ts

import apiClient from './axios';
import { LoginCredentials, RegisterData } from '../types/auth';

// Define the shape of the successful authentication response from the backend
export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'read-only';
    token: string;
}

/**
 * Sends a login request to the API.
 * @param credentials The user's email and password.
 * @returns A promise that resolves to the server's response.
 */
export const loginUser = (credentials: LoginCredentials) => {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
};

/**
 * Sends a registration request to the API.
 * @param data The new user's name, email, and password.
 * @returns A promise that resolves to the server's response.
 */
export const registerUser = (data: RegisterData) => {
    return apiClient.post<AuthResponse>('/auth/register', data);
};