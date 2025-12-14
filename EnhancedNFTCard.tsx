// web/src/components/EnhancedNFTCard.tsx
import { useState, useEffect } from 'react';
import { 
  Timer, 
  Eye, 
  Heart, 
  Share2, 
  Users, 
  Bot, 
  Target, 
  Zap,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

interface NFTCardProps {
  id: number;
  title: string;
  artist: string;
  currentBid: string;
  startPrice: string;
  timeLeft: string;
  endTime: number;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  views: number;
  likes: number;
  bids: number;
  status: 'live' | 'ending' | 'sold';
  agentsActive: number;
  lastBidder: string;
  onPlaceBid?: () => void;
  onSetAutoBid?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}

export function EnhancedNFTCard({
  id,
  title,
  artist,
  currentBid,
  startPrice,
  timeLeft,
  endTime,
  image,
  rarity,
  views,
  likes,
  bids,
  status,
  agentsActive,
  lastBidder,
  onPlaceBid,
  onSetAutoBid,
  onLike,
  onShare
}: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'from-purple-500 to-pink-500';
      case 'Legendary': return 'from-yellow-500 to-orange-500';
      case 'Epic': return 'from-blue-500 to-purple-500';
      case 'Rare': return 'from-green-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'shadow-purple-500/50';
      case 'Legendary': return 'shadow-yellow-500/50';
      case 'Epic': return 'shadow-blue-500/50';
      case 'Rare': return 'shadow-green-500/50';
      default: return 'shadow-gray-500/50';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <div 
      className="nft-card group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }}
    >
      {/* NFT Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(rarity)} opacity-20 animate-pulse`}></div>
        
        {/* Particle Effect Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main NFT Display */}
        <div className="absolute inset-0 flex items-center justify-center text-8xl relative z-10">
          <span 
            className="transform transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: isHovered ? 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))' : 'none'
            }}
          >
            {image}
          </span>
        </div>

        {/* Holographic Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(${mousePosition.x + 45}deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 30%, 
              transparent 70%, 
              rgba(255, 255, 255, 0.1) 100%)`
          }}
        ></div>

        {/* Rarity Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(rarity)} text-white shadow-lg ${getRarityGlow(rarity)}`}>
            <Sparkles className="w-3 h-3 inline mr-1" />
            {rarity}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={
            status === 'ending' ? 'badge-ending' : 
            status === 'sold' ? 'badge-sold' : 'badge-live'
          }>
            {status === 'ending' ? 'Ending Soon' : 
             status === 'sold' ? 'Sold' : 'Live'}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={handleLike}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500/80 text-white' 
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={onShare}
            className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* AI Activity Indicator */}
        {agentsActive > 0 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30">
            <Bot size={14} className="text-purple-400 animate-pulse" />
            <span className="text-xs text-purple-300 font-semibold">{agentsActive} AI</span>
          </div>
        )}
      </div>
      
      {/* NFT Details */}
      <div className="p-6 space-y-4">
        {/* Title and Artist */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">{title}</h3>
            <p className="text-gray-400">by {artist}</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-sm text-green-400 font-semibold">+{Math.floor(Math.random() * 50)}%</span>
          </div>
        </div>

        {/* Bid Information */}
        <div className="glass-card p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-400">Current Bid</p>
              <p className="text-2xl font-bold gradient-text">{currentBid} MON</p>
              <p className="text-xs text-gray-500">Started at {startPrice} MON</p>
            </div>
            <div className="timer-modern">
              <Timer size={16} />
              <span className="font-mono">{timeLeft}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((parseFloat(currentBid) / parseFloat(startPrice)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 hover:text-white transition">
              <Eye size={14} />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 hover:text-white transition">
              <Heart size={14} className={isLiked ? 'text-red-400 fill-current' : ''} />
              {likes + (isLiked ? 1 : 0)}
            </span>
            <span className="flex items-center gap-1 hover:text-white transition">
              <Users size={14} />
              {bids} bids
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={14} className="text-amber-400" />
            <span className="text-amber-400 font-semibold">#{Math.floor(Math.random() * 1000) + 1}</span>
          </div>
        </div>

        {/* Last Bidder */}
        <div className="bid-item">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              lastBidder === 'You' ? 'bg-green-400' : 
              lastBidder.includes('AI') || lastBidder.includes('Bot') ? 'bg-purple-400' : 'bg-cyan-400'
            } animate-pulse`}></div>
            <span className="text-sm text-gray-300">
              Last bid by <span className="font-semibold text-white">{lastBidder}</span>
            </span>
          </div>
          {lastBidder.includes('AI') || lastBidder.includes('Bot') ? (
            <Bot size={14} className="text-purple-400" />
          ) : (
            <Users size={14} className="text-cyan-400" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onPlaceBid}
            className="btn-3d flex-1 flex items-center justify-center gap-2 text-sm"
            disabled={status === 'sold'}
          >
            <Target size={16} />
            {status === 'sold' ? 'Sold' : 'Place Bid'}
          </button>
          <button 
            onClick={onSetAutoBid}
            className="glass-card px-4 py-3 border border-white/20 text-white hover:border-purple-500/50 transition-all duration-200 hover:scale-105"
            disabled={status === 'sold'}
          >
            <Bot size={16} />
          </button>
        </div>

        {/* Bid History Preview */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Recent Bids</p>
          <div className="space-y-1 max-h-20 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between text-xs text-gray-400">
                <span>{i === 0 ? lastBidder : `Bidder ${i + 1}`}</span>
                <span className="font-mono">{(parseFloat(currentBid) - i * 0.1).toFixed(1)} MON</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}