import React from 'react';
import { Link2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-powder-300/20 bg-charcoal-900 py-3 sm:py-4 shrink-0 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-charcoal-800 flex items-center justify-center border border-powder-300/40">
            <Link2 className="w-3.5 h-3.5 text-orange-primary" />
          </div>
          <span className="font-bold text-xs text-white">Linqo</span>
          <span className="text-[11px] text-powder-300/60 hidden sm:inline">
            — Precision URL Shortener
          </span>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-powder-300/60">
          <span>&copy; {new Date().getFullYear()} Linqo. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
