import React, { createContext, useState, useEffect } from 'react';
import { ROLES, MOCK_USERS } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(ROLES.PUBLIC);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore auth state from localStorage if present
    try {
      const savedUser = localStorage.getItem('bhoomi_user');
      const savedRole = localStorage.getItem('bhoomi_role');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedRole) {
        setSelectedRole(savedRole);
      }
    } catch (e) {
      console.error('Error loading saved auth state', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectRole = (role) => {
    setSelectedRole(role);
    localStorage.setItem('bhoomi_role', role);
  };

  const login = async (email, password, role = selectedRole) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          setLoading(false);
          reject(new Error('Email and password are required.'));
          return;
        }

        // Mock auth user object
        const authenticatedUser = {
          ...(MOCK_USERS[role] || MOCK_USERS.PUBLIC),
          email: email,
          role: role,
        };

        setUser(authenticatedUser);
        setSelectedRole(role);
        localStorage.setItem('bhoomi_user', JSON.stringify(authenticatedUser));
        localStorage.setItem('bhoomi_role', role);
        setLoading(false);
        resolve(authenticatedUser);
      }, 500);
    });
  };

  const register = async (userData, role = ROLES.PUBLIC) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!userData.email || !userData.fullName) {
          setLoading(false);
          reject(new Error('Full name and email are required.'));
          return;
        }

        const newPublicUser = {
          id: `usr_pub_${Date.now()}`,
          name: userData.fullName,
          email: userData.email,
          phone: userData.phone || '+91 98765 00000',
          location: userData.location || 'India',
          joinedDate: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          role: ROLES.PUBLIC,
          organization: 'Citizen Access',
          designation: 'General Citizen / Public User',
          bio: 'Registered Public User on BHOOMIVISION platform.',
        };

        setUser(newPublicUser);
        setSelectedRole(ROLES.PUBLIC);
        localStorage.setItem('bhoomi_user', JSON.stringify(newPublicUser));
        localStorage.setItem('bhoomi_role', ROLES.PUBLIC);
        setLoading(false);
        resolve(newPublicUser);
      }, 600);
    });
  };

  const forgotPassword = async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address.'));
          return;
        }
        resolve({
          success: true,
          message: `Password reset link has been sent to ${email}`,
        });
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bhoomi_user');
    localStorage.removeItem('bhoomi_role');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedRole,
        isAuthenticated: !!user,
        loading,
        selectRole,
        login,
        register,
        forgotPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
