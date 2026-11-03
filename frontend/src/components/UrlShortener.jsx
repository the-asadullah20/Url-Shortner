import React, { useState } from 'react';
import { shortenUrl } from '../api/client';
import { Link2, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function UrlShortener({ onShortenSuccess }) {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationWarning, setValidationWarning] = useState(null);

  const validateUrl = (value) => {
    if (!value || !value.trim()) {
      return { valid: false, message: 'Please enter a URL to shorten.' };
    }

    const trimmed = value.trim();

    if (!/^https?:\/\//i.test(trimmed)) {
      if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i.test(trimmed)) {
        return {
          valid: true,
          corrected: `https://${trimmed}`,
          warning: 'Added https:// prefix automatically.',
        };
      }
      return { valid: false, message: 'Please provide a valid web address (e.g., https://example.com).' };
    }

    try {
      const parsed = new URL(trimmed);
      if (!parsed.hostname || parsed.hostname.length < 3) {
        return { valid: false, message: 'Please provide a valid hostname.' };
      }
      return { valid: true, corrected: trimmed };
    } catch {
      return { valid: false, message: 'Invalid URL format. Check the address and try again.' };
    }
  };

  const handleInputChange = (e) => {
    setUrlInput(e.target.value);
    if (error) setError(null);
    if (validationWarning) setValidationWarning(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationWarning(null);

    const validation = validateUrl(urlInput);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    const targetUrl = validation.corrected;
    if (validation.warning) {
      setValidationWarning(validation.warning);
    }

    setLoading(true);
    try {
      const result = await shortenUrl(targetUrl);
      setUrlInput('');
      if (onShortenSuccess) {
        onShortenSuccess(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to shorten URL. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pt-8 pb-6 sm:pt-12 sm:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Editorial Subheader Badge - with powder blue frame, NO STARS */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-powder-300/50 bg-charcoal-750 text-powder-300 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
          <span className="font-mono text-orange-primary font-bold">/</span>
          <span>Shorten & Generate QR Code</span>
        </div>

        {/* Expressive Editorial Headline with Powder Blue accents */}
        <h1 className="editorial-title text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12] mb-4">
          Turn long links into <span className="italic font-serif text-orange-primary underline decoration-powder-300/60 underline-offset-8">concise</span> digital assets.
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-powder-200/90 font-normal leading-relaxed mb-8">
          Clean URLs, instant backend QR generation, and lightning-fast Redis routing.
        </p>

        {/* The Centerpiece: Large Elegant Rounded URL Input Box with Powder Blue border */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative group p-2 rounded-2xl sm:rounded-3xl bg-charcoal-750 border-2 border-powder-300/40 focus-within:border-powder-300 shadow-dark-elevated transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Input field with icon */}
              <div className="relative flex-1 flex items-center pl-4 pr-3 py-2">
                <Link2 className="w-6 h-6 text-powder-300 shrink-0 mr-3 stroke-[2.2]" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter your URL..."
                  aria-label="URL to shorten"
                  className="w-full bg-transparent text-white placeholder-powder-300/40 text-base sm:text-lg focus:outline-none font-sans disabled:opacity-50"
                />
                {urlInput && !loading && (
                  <button
                    type="button"
                    onClick={() => setUrlInput('')}
                    className="p-1 text-powder-300/70 hover:text-white text-xs font-semibold rounded-md transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Prominent Vibrant Orange Shorten URL Button */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-orange-primary hover:bg-orange-hover active:bg-orange-active text-white text-sm sm:text-base font-semibold shadow-orange-glow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group-hover:scale-[1.01] active:scale-[0.98] shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Shortening...</span>
                  </>
                ) : (
                  <>
                    <span>Shorten URL</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Validation Warning */}
          {validationWarning && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-xs font-medium text-powder-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-powder-400" />
              <span>{validationWarning}</span>
            </div>
          )}

          {/* Error Feedback */}
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-orange-primary/10 border border-orange-primary/40 text-orange-subtle flex items-start space-x-3 text-left animate-slide-up">
              <AlertCircle className="w-5 h-5 text-orange-primary shrink-0 mt-0.5" />
              <div className="flex-1 text-sm font-medium">
                <span className="font-semibold block text-orange-primary">Shortening Request Failed</span>
                <span className="text-powder-200">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
