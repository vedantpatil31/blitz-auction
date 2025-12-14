// web/src/components/CreateCollectionModal.tsx
import { useState } from 'react';
import { X, Layers, Upload } from 'lucide-react';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (collection: CollectionData) => void;
}

export interface CollectionData {
  name: string;
  symbol: string;
  description: string;
  royalty: string;
  category: string;
}

export function CreateCollectionModal({ isOpen, onClose, onCreate }: CreateCollectionModalProps) {
  const [formData, setFormData] = useState<CollectionData>({
    name: '',
    symbol: '',
    description: '',
    royalty: '5',
    category: 'Art'
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
    setFormData({
      name: '',
      symbol: '',
      description: '',
      royalty: '5',
      category: 'Art'
    });
    setBannerFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="glass-card p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Layers size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Create Collection</h2>
                <p className="text-sm text-gray-400">Launch your NFT collection on Monad</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2535] transition">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Banner Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Collection Banner
              </label>
              <div className="relative border-2 border-dashed border-[#2a3142] rounded-xl p-8 bg-[#1a1f2e]/50 hover:border-cyan-500/50 transition">
                <input
                  type="file"
                  onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {bannerFile ? (
                  <div className="text-center">
                    <p className="text-white font-semibold">{bannerFile.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {(bannerFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-cyan-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Upload banner image</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Recommended: 1400 x 400px (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Collection Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Collection Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Cyber Punks"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Symbol *
                </label>
                <input
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  placeholder="e.g., CYPNK"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your collection..."
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="Art">Art</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Music">Music</option>
                  <option value="Photography">Photography</option>
                  <option value="Collectibles">Collectibles</option>
                  <option value="Virtual Worlds">Virtual Worlds</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Royalty (%) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="10"
                  required
                  value={formData.royalty}
                  onChange={(e) => setFormData({ ...formData, royalty: e.target.value })}
                  placeholder="5.0"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-300">
                <strong>Note:</strong> You'll earn {formData.royalty}% on all secondary sales in this collection. 
                Royalty percentage cannot be changed after creation.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-gray-400 font-semibold hover:bg-[#1f2535] hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition shadow-lg shadow-purple-500/30"
              >
                Create Collection
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
