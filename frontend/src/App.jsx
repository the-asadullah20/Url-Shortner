import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import UrlShortener from './components/UrlShortener';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const { isAuthenticated } = useAuth();

  const [latestResult, setLatestResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('linqo_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('linqo_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  const handleShortenSuccess = (result) => {
    setLatestResult(result);
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.short_code !== result.short_code);
      return [
        {
          ...result,
          timestamp: new Date().toISOString(),
        },
        ...filtered,
      ].slice(0, 20);
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('linqo_history');
  };

  const handleReset = () => {
    setLatestResult(null);
  };

  return (
    <div
      className={
        !isAuthenticated
          ? "min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-between bg-charcoal-800 text-white selection:bg-orange-primary selection:text-white"
          : "min-h-screen flex flex-col justify-between bg-charcoal-800 text-white selection:bg-orange-primary selection:text-white transition-colors duration-200"
      }
    >
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content with guaranteed breathing room */}
      <main className={!isAuthenticated ? "flex-1 min-h-0 flex items-center justify-center p-3 sm:p-4" : "flex-1 w-full"}>
        {!isAuthenticated ? (
          /* Fixed locked landing page with fully visible, unclipped auth card */
          <LandingHero />
        ) : (
          /* Authenticated Dashboard: URL Shortener Box Centerpiece & Results */
          <div className="w-full">
            <UrlShortener onShortenSuccess={handleShortenSuccess} />

            {/* Shortened URL Result Card */}
            {latestResult && (
              <ResultCard
                result={latestResult}
                onReset={handleReset}
              />
            )}

            {/* History of Shortened Links */}
            <HistoryList
              history={history}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}
      </main>

      {/* Footer only rendered in authenticated dashboard */}
      {isAuthenticated && <Footer />}

      {/* Global Responsive Authentication Modal */}
      <AuthModal />
    </div>
  );
}
