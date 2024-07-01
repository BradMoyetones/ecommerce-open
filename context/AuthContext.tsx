"use client"
// context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean; // Nuevo campo para verificar si el usuario está autenticado
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Recuperar el usuario del almacenamiento local si existe
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Determinar si hay un usuario autenticado
    const isAuthenticated = !!user;

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
