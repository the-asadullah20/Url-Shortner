import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function RegisterPage({ onFocusField, onBlurField, onSwitchToLogin }) {
  const { register, loginGoogle, authLoading, authError, setAuthError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localValidation, setLocalValidation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalValidation(null);
    setAuthError(null);

    if (!email.trim() || !password) {
      setLocalValidation('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setLocalValidation('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalValidation('Passwords do not match.');
      return;
    }

    await register(email.trim(), password);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-2 text-left">
        <h3 className="editorial-title text-lg sm:text-xl font-medium text-white">
          Create an <span className="italic font-serif text-orange-primary">account</span>.
        </h3>
        <p className="text-[11px] text-powder-300/80 mt-0.5">
          Sign up to unlock the URL shortener and QR generator.
        </p>
      </div>

      {/* Traditional Google Sign-In Button */}
      <button
        type="button"
        onClick={loginGoogle}
        disabled={authLoading}
        className="w-full flex items-center justify-center space-x-2 py-1.5 sm:py-2 px-3 rounded-xl bg-white text-charcoal-900 hover:bg-neutral-100 font-sans text-xs font-semibold border border-neutral-300 shadow-sm transition-all duration-150 mb-2 disabled:opacity-60"
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Sign up with Google</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center mb-2">
        <div className="border-t border-powder-300/30 w-full" />
        <span className="bg-charcoal-750 px-2 text-[10px] uppercase tracking-wider text-powder-300/80 font-bold absolute">
          or with email
        </span>
      </div>

      {/* Error Notices */}
      {(authError || localValidation) && (
        <div className="mb-2 p-2 rounded-lg bg-orange-primary/15 border border-orange-primary/40 text-[11px] font-medium text-orange-subtle flex items-start space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-orange-primary shrink-0 mt-0.5" />
          <span>{authError || localValidation}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Email */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-powder-300 mb-0.5">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="w-3.5 h-3.5 text-powder-300 absolute left-3 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => onFocusField('email')}
              onBlur={onBlurField}
              placeholder="you@domain.com"
              className="w-full pl-8 pr-2.5 py-1.5 sm:py-2 rounded-xl bg-charcoal-850 border border-powder-300/40 text-white placeholder-powder-300/40 focus:outline-none focus:border-powder-300 text-xs sm:text-sm transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-powder-300 mb-0.5">
            Password (min. 6 characters)
          </label>
          <div className="relative flex items-center">
            <Lock className="w-3.5 h-3.5 text-powder-300 absolute left-3 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => onFocusField('password')}
              onBlur={onBlurField}
              placeholder="••••••••••••"
              className="w-full pl-8 pr-8 py-1.5 sm:py-2 rounded-xl bg-charcoal-850 border border-powder-300/40 text-white placeholder-powder-300/40 focus:outline-none focus:border-powder-300 text-xs sm:text-sm font-sans transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 p-0.5 text-powder-300/70 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-powder-300 mb-0.5">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-3.5 h-3.5 text-powder-300 absolute left-3 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => onFocusField('confirmPassword')}
              onBlur={onBlurField}
              placeholder="••••••••••••"
              className="w-full pl-8 pr-2.5 py-1.5 sm:py-2 rounded-xl bg-charcoal-850 border border-powder-300/40 text-white placeholder-powder-300/40 focus:outline-none focus:border-powder-300 text-xs sm:text-sm font-sans transition-colors"
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={authLoading}
          className="w-full flex items-center justify-center space-x-2 py-2 sm:py-2.5 rounded-xl bg-orange-primary hover:bg-orange-hover active:bg-orange-active text-white text-xs sm:text-sm font-semibold shadow-orange-glow transition-all duration-150 active:scale-[0.98] disabled:opacity-60 mt-1"
        >
          {authLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Register & Unlock Shortener</span>
          )}
        </button>
      </form>

      {/* Link Back to Login */}
      <div className="mt-2 text-center text-[11px] text-powder-300/80">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-bold text-orange-primary hover:underline ml-1"
        >
          Log in instead
        </button>
      </div>
    </div>
  );
}
