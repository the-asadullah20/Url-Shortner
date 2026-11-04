import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import OwlMascot from './OwlMascot';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { X } from 'lucide-react';

export default function AuthModal() {
  const { authModalState, closeAuthModal, switchMode } = useAuth();
  const [activeField, setActiveField] = useState(null);

  if (!authModalState.isOpen) return null;

  const isLogin = authModalState.mode === 'login';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal-950/85 backdrop-blur-md animate-fade-in">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={closeAuthModal} />

      {/* Modal Card wrapper - with top clearance for the Owl */}
      <div className="relative w-full max-w-sm sm:max-w-md pt-7 sm:pt-9 my-auto z-10 animate-slide-up">
        {/* Auth Card Container - Fits fully in laptop screen without scrolling */}
        <div className="relative bg-charcoal-750 border-2 border-powder-300 rounded-3xl p-4 sm:p-5 shadow-dark-elevated">
          {/* Owl Mascot perched on the card edge */}
          <OwlMascot activeField={activeField} />

          {/* Top bar with mode switcher & close button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-charcoal-850 border border-powder-300/40">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isLogin
                    ? 'bg-orange-primary text-white shadow-sm'
                    : 'text-powder-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('register')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  !isLogin
                    ? 'bg-orange-primary text-white shadow-sm'
                    : 'text-powder-300 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            <button
              onClick={closeAuthModal}
              aria-label="Close dialog"
              className="p-1.5 rounded-full text-powder-300 hover:text-white hover:bg-charcoal-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active View */}
          {isLogin ? (
            <LoginPage
              onFocusField={(field) => setActiveField(field)}
              onBlurField={() => setActiveField(null)}
              onSwitchToRegister={() => switchMode('register')}
            />
          ) : (
            <RegisterPage
              onFocusField={(field) => setActiveField(field)}
              onBlurField={() => setActiveField(null)}
              onSwitchToLogin={() => switchMode('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
