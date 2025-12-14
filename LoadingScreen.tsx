// web/src/components/LoadingScreen.tsx
import { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading the future of NFT auctions..." }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Connecting to Monad Network...",
    "Loading Smart Contracts...",
    "Syncing Auction Data...",
    "Initializing AI Agents...",
    "Ready to Launch!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-white rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="flex flex-col items-center gap-8 z-10">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          {/* Rotating Ring */}
          <div className="absolute inset-0 rounded-3xl border-4 border-transparent border-t-purple-500 border-r-cyan-500 animate-spin"></div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">BidStream</h1>
          <p className="text-gray-400 text-lg">{message}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Loading...</span>
            <span className="text-sm text-purple-400 font-semibold">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="text-center">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Zap size={16} className="text-cyan-400 animate-pulse" />
            <span>{steps[currentStep]}</span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-2xl">
          <div className="text-center p-4 glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Lightning Fast</h3>
            <p className="text-xs text-gray-400">400ms block times</p>
          </div>

          <div className="text-center p-4 glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">AI Powered</h3>
            <p className="text-xs text-gray-400">Smart agents</p>
          </div>

          <div className="text-center p-4 glass-card">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Parallel EVM</h3>
            <p className="text-xs text-gray-400">Monad network</p>
          </div>
        </div>
      </div>
    </div>
  );
}