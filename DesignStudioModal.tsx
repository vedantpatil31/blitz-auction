// web/src/components/DesignStudioModal.tsx
import { useState } from 'react';
import { X, Palette, Eye } from 'lucide-react';

interface DesignStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (design: DesignData) => void;
}

export interface DesignData {
  profileBanner: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonStyle: string;
}

export function DesignStudioModal({ isOpen, onClose, onSave }: DesignStudioModalProps) {
  const [design, setDesign] = useState<DesignData>({
    profileBanner: '',
    accentColor: '#06b6d4',
    backgroundColor: '#0a0e1a',
    textColor: '#e5e7eb',
    buttonStyle: 'gradient'
  });

  const accentColors = [
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' }
  ];

  const buttonStyles = [
    { id: 'gradient', label: 'Gradient', preview: 'bg-gradient-to-r from-cyan-500 to-blue-600' },
    { id: 'solid', label: 'Solid', preview: 'bg-cyan-500' },
    { id: 'outline', label: 'Outline', preview: 'border-2 border-cyan-500 bg-transparent' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(design);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="glass-card p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center">
                <Palette size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Design Studio</h2>
                <p className="text-sm text-gray-400">Customize your profile appearance</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f2535] transition">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Controls */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">Customization</h3>

                {/* Banner Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profile Banner
                  </label>
                  <div className="relative border-2 border-dashed border-[#2a3142] rounded-xl p-6 bg-[#1a1f2e]/50 hover:border-cyan-500/50 transition">
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setDesign({ ...design, profileBanner: file.name });
                        }
                      }}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <p className="text-white text-sm">
                        {design.profileBanner || 'Upload banner (1200x300px)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Accent Color
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setDesign({ ...design, accentColor: color.value })}
                        className={`p-4 rounded-xl border-2 transition ${
                          design.accentColor === color.value
                            ? 'border-white scale-105'
                            : 'border-[#2a3142] hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: color.value }}
                      >
                        <div className="text-white text-xs font-semibold text-center">
                          {color.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Button Style
                  </label>
                  <div className="space-y-3">
                    {buttonStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setDesign({ ...design, buttonStyle: style.id })}
                        className={`w-full p-4 rounded-xl border-2 transition ${
                          design.buttonStyle === style.id
                            ? 'border-cyan-500 bg-cyan-500/5'
                            : 'border-[#2a3142] bg-[#1a1f2e]/50 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{style.label}</span>
                          <div className={`px-6 py-2 rounded-lg ${style.preview} text-white text-sm font-semibold`}>
                            Preview
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Background
                    </label>
                    <div className="relative">
                      <input
                        type="color"
                        value={design.backgroundColor}
                        onChange={(e) => setDesign({ ...design, backgroundColor: e.target.value })}
                        className="w-full h-12 rounded-xl cursor-pointer bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Text Color
                    </label>
                    <div className="relative">
                      <input
                        type="color"
                        value={design.textColor}
                        onChange={(e) => setDesign({ ...design, textColor: e.target.value })}
                        className="w-full h-12 rounded-xl cursor-pointer bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Eye size={20} className="text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                </div>

                <div 
                  className="rounded-xl overflow-hidden border border-[#2a3142]"
                  style={{ backgroundColor: design.backgroundColor }}
                >
                  {/* Banner */}
                  <div 
                    className="h-32 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 flex items-center justify-center"
                    style={{ borderBottom: `3px solid ${design.accentColor}` }}
                  >
                    <p className="text-xs text-gray-400">Profile Banner Preview</p>
                  </div>

                  {/* Profile Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 
                        className="text-xl font-bold mb-2"
                        style={{ color: design.textColor }}
                      >
                        Your Profile Name
                      </h4>
                      <p 
                        className="text-sm opacity-70"
                        style={{ color: design.textColor }}
                      >
                        This is how your profile will appear to visitors
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {['12 NFTs', '5.4 MON', '8 Wins'].map((stat, i) => (
                        <div 
                          key={i}
                          className="p-3 rounded-lg border"
                          style={{ 
                            borderColor: `${design.accentColor}30`,
                            backgroundColor: `${design.accentColor}10`
                          }}
                        >
                          <p 
                            className="text-sm font-semibold text-center"
                            style={{ color: design.textColor }}
                          >
                            {stat}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Button Preview */}
                    <div className="pt-4">
                      {design.buttonStyle === 'gradient' && (
                        <button
                          type="button"
                          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r text-white font-semibold"
                          style={{ 
                            backgroundImage: `linear-gradient(to right, ${design.accentColor}, ${design.accentColor}dd)` 
                          }}
                        >
                          Sample Button
                        </button>
                      )}
                      {design.buttonStyle === 'solid' && (
                        <button
                          type="button"
                          className="w-full px-6 py-3 rounded-xl text-white font-semibold"
                          style={{ backgroundColor: design.accentColor }}
                        >
                          Sample Button
                        </button>
                      )}
                      {design.buttonStyle === 'outline' && (
                        <button
                          type="button"
                          className="w-full px-6 py-3 rounded-xl border-2 font-semibold"
                          style={{ 
                            borderColor: design.accentColor,
                            color: design.accentColor 
                          }}
                        >
                          Sample Button
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-8 mt-8 border-t border-[#2a3142]">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-gray-400 font-semibold hover:bg-[#1f2535] hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-600 text-white font-semibold hover:from-pink-600 hover:to-orange-700 transition shadow-lg shadow-pink-500/30"
              >
                Save Design
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
