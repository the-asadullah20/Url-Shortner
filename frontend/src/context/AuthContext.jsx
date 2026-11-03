import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getGoogleAuthUrl } from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('linqo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    mode: 'login',
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check for OAuth return in URL hash or search params
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token=')) {
        const params = new URLSearchParams(hash.replace(/^#/, ''));
        const accessToken = params.get('access_token');
        if (accessToken) {
          // Decode JWT payload
          const base64Url = accessToken.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));
          const oauthUser = {
            email: payload.email || 'google_user@linqo.com',
            id: payload.sub,
            token: accessToken,
          };
          setUser(oauthUser);
          // Clean hash from browser URL bar
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    } catch (err) {
      console.error('OAuth callback parsing error:', err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('linqo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('linqo_user');
    }
  }, [user]);

  const openLogin = () => {
    setAuthError(null);
    setAuthModalState({ isOpen: true, mode: 'login' });
  };

  const openRegister = () => {
    setAuthError(null);
    setAuthModalState({ isOpen: true, mode: 'register' });
  };

  const closeAuthModal = () => {
    setAuthError(null);
    setAuthModalState(prev => ({ ...prev, isOpen: false }));
  };

  const switchMode = (mode) => {
    setAuthError(null);
    setAuthModalState(prev => ({ ...prev, mode }));
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await loginUser(email, password);
      const currentUser = data.user || data.data?.user || { email };
      setUser(currentUser);
      closeAuthModal();
      return { success: true, data };
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please verify credentials.');
      return { success: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await registerUser(email, password);
      const currentUser = data.user || data.data?.user || { email };
      setUser(currentUser);
      closeAuthModal();
      return { success: true, data };
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const loginGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const url = await getGoogleAuthUrl();
      if (url && typeof url === 'string') {
        window.location.href = url;
      } else {
        throw new Error('Google OAuth URL not returned from backend.');
      }
    } catch (err) {
      setAuthError(err.message || 'Unable to connect to backend for Google sign in.');
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('linqo_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authModalState,
        authLoading,
        authError,
        setAuthError,
        openLogin,
        openRegister,
        closeAuthModal,
        switchMode,
        login,
        register,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
