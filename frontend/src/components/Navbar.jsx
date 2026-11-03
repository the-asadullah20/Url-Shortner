import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, LogOut, Link2 } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, openLogin, openRegister, logout } = useAuth();

  return (
    <header className="w-full border-b border-powder-300/30 bg-charcoal-900/95 backdrop-blur-md sticky top-0 z-40 transition-colors shadow-sm shrink-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl bg-charcoal-800 flex items-center justify-center border-2 border-powder-300 shadow-sm group-hover:border-white transition-all duration-200">
            <Link2 className="w-4 h-4 text-orange-primary stroke-[2.4]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight text-white font-sans">
                Linqo
              </span>
              <span className="text-powder-300 text-xs font-mono font-medium tracking-wide">
                / short
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-powder-300/80">
              Editorial Link Engine
            </span>
          </div>
        </div>

        {/* Right Actions: Auth */}
        <div className="flex items-center space-x-2.5">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-charcoal-800 border-2 border-powder-300 text-xs shadow-sm">
                <div className="w-5 h-5 rounded-full bg-powder-300 text-charcoal-950 flex items-center justify-center font-bold text-[10px]">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[140px] truncate font-medium text-powder-100 text-xs">
                  {user?.email || 'Authenticated'}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-powder-200 hover:text-white border border-powder-300/40 hover:border-orange-primary bg-charcoal-800 hover:bg-charcoal-750 transition-all duration-150"
              >
                <LogOut className="w-3.5 h-3.5 text-orange-primary" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={openLogin}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-powder-300 hover:text-white border-2 border-powder-300 hover:bg-powder-300/10 bg-charcoal-800 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-powder-300" />
                <span>Sign In</span>
              </button>
              <button
                onClick={openRegister}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-orange-primary hover:bg-orange-hover shadow-orange-glow transition-all duration-150 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
