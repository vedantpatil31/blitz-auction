// web/src/pages/404.tsx
import Link from 'next/link';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold gradient-text mb-4 animate-pulse">
            404
          </div>
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl mb-6 float">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! This NFT seems to have vanished
          </h1>
          
          <p className="text-xl text-gray-400 leading-relaxed">
            The page you're looking for might have been sold, moved to another dimension, 
            or is currently being minted in the metaverse.
          </p>

          <div className="glass-card p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">What you can do:</h3>
            <ul className="text-left text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                Check the URL for typos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                Browse our live auctions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                Discover new NFT collections
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link href="/" className="btn-3d flex items-center gap-2">
              <Home size={20} />
              Back to Home
            </Link>
            
            <Link href="/discover" className="glass-card px-6 py-3 border border-white/20 text-white font-semibold hover:border-purple-500/50 transition flex items-center gap-2">
              <Search size={20} />
              Discover NFTs
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="glass-card px-6 py-3 border border-white/20 text-white font-semibold hover:border-cyan-500/50 transition flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          {/* Fun Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <div className="stat-card">
              <div className="text-2xl font-bold gradient-text">∞</div>
              <div className="text-sm text-gray-400">Possible NFTs</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl font-bold gradient-text">404</div>
              <div className="text-sm text-gray-400">Error Code</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl font-bold gradient-text">1</div>
              <div className="text-sm text-gray-400">Way Back</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}