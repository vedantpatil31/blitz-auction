// web/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import '../../styles/globals.css';
import { SidebarProvider } from '../contexts/SidebarContext';
import { ToastProvider } from '../contexts/ToastContext';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold gradient-text mb-2">BidStream</h1>
            <p className="text-gray-400">Loading the future of NFT auctions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </SidebarProvider>
  );
}