// src/types/auth.ts

// Type for the data required for user login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Type for the data required for user registration
export interface RegisterData extends LoginCredentials {
    name: string;
}