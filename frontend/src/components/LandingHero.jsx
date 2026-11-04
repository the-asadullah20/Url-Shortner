import React, { useState } from 'react';
import OwlMascot from './OwlMascot';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { Link2 } from 'lucide-react';

export default function LandingHero() {
  const [activeTab, setActiveTab] = useState('register');
  const [activeField, setActiveField] = useState(null);

  const isLogin = activeTab === 'login';

  return (
    <div className="w-full h-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center py-2 sm:py-4">
      {/* Powder Blue Ambient Aura */}
      <div className="absolute w-[650px] h-[350px] bg-powder-300/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Clean Editorial Headline & Value */}
        <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left space-y-4">
          {/* Powder Blue Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border-2 border-powder-300 bg-charcoal-750 text-powder-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="font-mono text-orange-primary font-bold">/</span>
            <span>Minimalist URL Infrastructure</span>
          </div>

          {/* Expressive Editorial Headline */}
          <h1 className="editorial-title text-3xl sm:text-4xl xl:text-5xl font-medium tracking-tight text-white leading-[1.14]">
            Shorten links with <span className="italic font-serif text-orange-primary underline decoration-powder-300 underline-offset-8">intent</span> and generate QR codes in seconds.
          </h1>

          {/* Concise Subtitle */}
          <p className="max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm text-powder-200/90 font-normal leading-relaxed">
            Create an account or sign in to access your personal link shortening workspace, instant backend QR downloads, and high-speed redirects.
          </p>
        </div>

        {/* Right Column: Beautiful Login/Register Card with Guaranteed Bottom Clearance */}
        <div className="lg:col-span-6 xl:col-span-5 w-full max-w-sm sm:max-w-md mx-auto pt-8 sm:pt-9 pb-2">
          <div className="relative bg-charcoal-750 border-2 border-powder-300 rounded-3xl p-4 sm:p-5 shadow-dark-elevated">
            {/* Special Owl Mascot with peeking reaction */}
            <OwlMascot activeField={activeField} />

            {/* Mode switch tabs */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1 p-1 rounded-xl bg-charcoal-850 border border-powder-300/40">
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    !isLogin
                      ? 'bg-orange-primary text-white shadow-sm'
                      : 'text-powder-300 hover:text-white'
                  }`}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isLogin
                      ? 'bg-orange-primary text-white shadow-sm'
                      : 'text-powder-300 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
              </div>

              <div className="text-[11px] font-mono text-powder-300 flex items-center space-x-1">
                <Link2 className="w-3.5 h-3.5 text-orange-primary" />
                <span>Linqo Auth</span>
              </div>
            </div>

            {/* Form Content */}
            {isLogin ? (
              <LoginPage
                onFocusField={(field) => setActiveField(field)}
                onBlurField={() => setActiveField(null)}
                onSwitchToRegister={() => setActiveTab('register')}
              />
            ) : (
              <RegisterPage
                onFocusField={(field) => setActiveField(field)}
                onBlurField={() => setActiveField(null)}
                onSwitchToLogin={() => setActiveTab('login')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
