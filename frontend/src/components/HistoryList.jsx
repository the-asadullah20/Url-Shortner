import React, { useState } from 'react';
import { getQrCodeUrl, downloadQrCode } from '../api/client';
import {
  History,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Trash2,
  Download,
  X
} from 'lucide-react';

export default function HistoryList({ history, onClearHistory }) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeQrModal, setActiveQrModal] = useState(null);

  if (!history || history.length === 0) return null;

  const handleCopy = async (item) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(item.short_url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = item.short_url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(item.short_code);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-orange-primary" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-powder-300">
              Recent Shortened Links ({history.length})
            </h3>
          </div>

          <button
            onClick={onClearHistory}
            className="flex items-center space-x-1.5 text-xs text-powder-300/70 hover:text-orange-primary transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="space-y-3">
          {history.map((item) => {
            const isCopied = copiedId === item.short_code;
            return (
              <div
                key={item.short_code}
                className="p-4 rounded-2xl bg-charcoal-750 border border-powder-300/30 hover:border-powder-300/60 shadow-sm transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-sm sm:text-base font-bold text-orange-primary">
                      {item.short_url}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal-850 border border-powder-300/40 text-powder-200 font-mono">
                      {item.short_code}
                    </span>
                  </div>
                  <p className="text-xs text-powder-300/70 font-mono truncate max-w-md sm:max-w-xl">
                    {item.original_url}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  {/* QR preview button */}
                  <button
                    onClick={() => setActiveQrModal(item)}
                    className="p-2 rounded-xl text-powder-300 bg-charcoal-850 border border-powder-300/30 hover:text-white hover:border-powder-300 transition-colors"
                    title="View QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(item)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isCopied
                        ? 'bg-powder-300 text-charcoal-950 font-bold'
                        : 'bg-charcoal-850 border border-powder-300/30 text-white hover:text-orange-primary hover:border-powder-300/60'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Open in new tab */}
                  <a
                    href={item.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-powder-300 bg-charcoal-850 border border-powder-300/30 hover:text-orange-primary transition-colors"
                    title="Open Short Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Code Quick Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-charcoal-800 border-2 border-powder-300 rounded-3xl p-5 max-w-sm w-full text-center shadow-dark-elevated relative">
            <button
              onClick={() => setActiveQrModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-powder-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-base font-bold text-white mb-1">
              QR Code Preview
            </h4>
            <p className="text-xs text-powder-300 font-mono truncate mb-4">
              {activeQrModal.short_url}
            </p>

            <div className="w-44 h-44 mx-auto p-3 bg-white rounded-2xl shadow-clean mb-4 border-2 border-powder-300 flex items-center justify-center">
              <img
                src={getQrCodeUrl(activeQrModal.short_code)}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={() => downloadQrCode(activeQrModal.short_code)}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-primary hover:bg-orange-hover shadow-orange-glow transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG QR Code</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
