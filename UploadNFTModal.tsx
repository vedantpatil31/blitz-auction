// web/src/components/UploadNFTModal.tsx
import { useState } from 'react';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

interface UploadNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (nft: NFTData) => void;
}

export interface NFTData {
  name: string;
  description: string;
  collection: string;
  properties: string;
  price: string;
}

export function UploadNFTModal({ isOpen, onClose, onUpload }: UploadNFTModalProps) {
  const [formData, setFormData] = useState<NFTData>({
    name: '',
    description: '',
    collection: '',
    properties: '',
    price: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(formData);
    onClose();
    setFormData({
      name: '',
      description: '',
      collection: '',
      properties: '',
      price: ''
    });
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="glass-card p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Upload size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Upload NFT</h2>
                <p className="text-sm text-gray-400">Create and list your digital asset</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2535] transition">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 transition ${
                dragActive 
                  ? 'border-cyan-500 bg-cyan-500/5' 
                  : file 
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-[#2a3142] bg-[#1a1f2e]/50'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center">
                {file ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                      <Check size={32} className="text-green-400" />
                    </div>
                    <div className="text-lg font-semibold text-white">{file.name}</div>
                    <div className="text-sm text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                    >
                      Change file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto">
                      <ImageIcon size={32} className="text-cyan-400" />
                    </div>
                    <div className="text-lg font-semibold text-white">
                      Drop your file here, or <span className="text-cyan-400">browse</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      PNG, JPG, GIF, WebP, MP4 up to 100MB
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  NFT Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Cyber Punk #001"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell collectors about your NFT..."
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Collection
                </label>
                <select
                  value={formData.collection}
                  onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="">Select Collection</option>
                  <option value="cyber-punks">Cyber Punks</option>
                  <option value="digital-art">Digital Art</option>
                  <option value="3d-renders">3D Renders</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (MON) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="10.00"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Properties (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.properties}
                  onChange={(e) => setFormData({ ...formData, properties: e.target.value })}
                  placeholder="e.g., Rare, Animated, Limited Edition"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>
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
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/30"
              >
                Upload & List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
