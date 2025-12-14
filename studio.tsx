// web/src/pages/studio.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar();
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileSelect = () => {
    // Simulate file selection
    setSelectedFile('preview-image.jpg');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="p-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Creator Studio</h1>
            <p className="text-gray-400">Create and list your NFTs on the auction platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Upload & Preview */}
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="premium-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Upload Artwork</h3>
                <div 
                  onClick={handleFileSelect}
                  className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-cyan-500/50 transition-colors cursor-pointer bg-white/5 hover:bg-white/10"
                >
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-amber-500/20 rounded-xl flex items-center justify-center text-6xl">
                        🎨
                      </div>
                      <p className="text-cyan-400 font-semibold">{selectedFile}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                        className="text-sm text-gray-400 hover:text-white transition"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <Upload size={32} className="text-cyan-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Upload Your NFT</h3>
                      <p className="text-gray-400 mb-4">PNG, JPG, GIF, SVG, MP4 up to 100MB</p>
                      <div className="btn-secondary inline-flex items-center gap-2">
                        <ImageIcon size={18} />
                        Choose File
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="glass-card p-6 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Quick Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Use high-quality images (min 1000x1000px)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Add detailed descriptions to attract bidders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Set competitive starting prices</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - NFT Details */}
            <div className="premium-card p-6">
              <h3 className="text-lg font-bold text-white mb-6">NFT Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">NFT Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Cosmic Dreamscape #001" 
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    className="input-premium" 
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Description *</label>
                  <textarea 
                    placeholder="Describe your NFT, its story, and what makes it unique..." 
                    rows={5} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-premium resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Starting Price *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0.0" 
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        className="input-premium pr-16" 
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">MON</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-300 mb-2 block">Reserve Price</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0.0" 
                        value={reservePrice}
                        onChange={(e) => setReservePrice(e.target.value)}
                        className="input-premium pr-16" 
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">MON</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Auction Duration</label>
                  <select className="input-premium">
                    <option>1 Day</option>
                    <option>3 Days</option>
                    <option>7 Days</option>
                    <option>14 Days</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Category</label>
                  <select className="input-premium">
                    <option>Art</option>
                    <option>Photography</option>
                    <option>Music</option>
                    <option>Video</option>
                    <option>3D Art</option>
                    <option>Collectibles</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button className="btn-3d w-full text-base py-4">
                    Create NFT Auction
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Gas fee: ~0.002 MON • Platform fee: 2.5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
