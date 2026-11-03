import React, { useState } from 'react';
import { getQrCodeUrl, downloadQrCode } from '../api/client';
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  QrCode,
  Link,
  Loader2,
  ArrowUpRight,
  Link2
} from 'lucide-react';

export default function ResultCard({ result, onReset }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  if (!result || !result.short_url) return null;

  const { original_url, short_url, short_code } = result;
  const qrImageUrl = getQrCodeUrl(short_code);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(short_url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = short_url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDownloadQr = async () => {
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadQrCode(short_code);
    } catch {
      setDownloadError('Unable to download QR code directly.');
      window.open(qrImageUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="w-full py-4 sm:py-6 animate-slide-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-charcoal-750 border-2 border-powder-300 shadow-dark-elevated p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
          {/* Subtle Top Powder Blue Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-powder-300 via-orange-primary to-powder-300" />

          {/* Section Header - Clean, NO STARS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-powder-300/25 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-charcoal-850 border border-powder-300/50 flex items-center justify-center text-powder-300">
                <Link2 className="w-5 h-5 text-orange-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                  Shortened Link Ready
                </h2>
                <p className="text-xs text-powder-300/80">
                  Ready to copy, test, and scan
                </p>
              </div>
            </div>

            {onReset && (
              <button
                onClick={onReset}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-powder-300/40 text-powder-200 hover:text-white hover:border-powder-300 transition-colors"
              >
                Shorten Another
              </button>
            )}
          </div>

          {/* Main Grid: Details on Left, QR on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: URLs and Actions */}
            <div className="md:col-span-7 lg:col-span-8 space-y-5">
              {/* Shortened URL display */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-powder-300">
                    Shortened URL
                  </span>
                  <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-charcoal-850 border border-powder-300/50 text-[11px] font-mono font-medium text-powder-200">
                    <span>Code:</span>
                    <strong className="text-orange-primary">{short_code}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-charcoal-850 border border-powder-300/30 group">
                  <div className="flex items-center space-x-3 truncate mr-3">
                    <Link className="w-5 h-5 text-orange-primary shrink-0" />
                    <span className="font-mono text-base sm:text-lg font-bold text-white truncate">
                      {short_url}
                    </span>
                  </div>

                  <a
                    href={short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Test redirect"
                    className="p-2 rounded-xl text-powder-300 hover:text-white hover:bg-charcoal-700 transition-colors shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Original URL Display */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-powder-300/70 block mb-1.5">
                  Original Destination
                </span>
                <div className="p-3 rounded-xl bg-charcoal-850/80 border border-powder-300/25 text-xs sm:text-sm font-mono text-powder-200/90 truncate flex items-center justify-between">
                  <span className="truncate mr-3">{original_url}</span>
                  <a
                    href={original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-powder-300 hover:underline shrink-0 flex items-center space-x-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Action Buttons: Copy Shortened URL and Visit */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className={`flex-1 min-w-[180px] inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                    copied
                      ? 'bg-powder-300 text-charcoal-950 font-bold'
                      : 'bg-orange-primary hover:bg-orange-hover text-white shadow-orange-glow'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[2.2]" />
                      <span>Copy Shortened URL</span>
                    </>
                  )}
                </button>

                {/* Direct visit button */}
                <a
                  href={short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold text-powder-100 bg-charcoal-850 hover:bg-charcoal-700 border border-powder-300/40 hover:border-powder-300 transition-colors"
                >
                  <span>Open Redirect</span>
                  <ExternalLink className="w-4 h-4 text-powder-300" />
                </a>
              </div>
            </div>

            {/* Right Column: QR Code Display and Download */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center p-4 rounded-2xl bg-charcoal-850 border border-powder-300/30">
              <div className="flex items-center space-x-2 mb-2.5 self-start text-xs font-bold uppercase tracking-wider text-powder-300">
                <QrCode className="w-4 h-4 text-orange-primary" />
                <span>Backend Generated QR</span>
              </div>

              {/* QR Image Box */}
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl bg-white p-2.5 shadow-clean flex items-center justify-center border-2 border-powder-300 overflow-hidden group">
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${short_url}`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <span className="text-[11px] text-powder-300/70 font-mono mt-2 mb-3">
                Scan with any smartphone camera
              </span>

              {/* Download QR Code Button */}
              <button
                onClick={handleDownloadQr}
                disabled={downloading}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-charcoal-950 bg-powder-300 hover:bg-powder-200 border border-powder-400 transition-all duration-150 disabled:opacity-60 shadow-sm"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Downloading PNG...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-orange-primary stroke-[2.2]" />
                    <span>Download QR Code (PNG)</span>
                  </>
                )}
              </button>

              {downloadError && (
                <span className="text-[11px] text-orange-primary mt-2">
                  {downloadError}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
