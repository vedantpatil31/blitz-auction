// web/src/pages/settings/profile.tsx
import { useState, useEffect } from 'react';
import { TopNav } from '../../components/layout/TopNav';
import { Sidebar } from '../../components/layout/Sidebar';
import { MainContent } from '../../components/layout/MainContent';
import { User, Save } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useToast } from '../../contexts/ToastContext';

export default function ProfileSettingsPage() {
  const { address } = useAccount();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    website: '',
    twitter: '',
    discord: '',
  });

  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`profile_${address}`);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    }
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      localStorage.setItem(`profile_${address}`, JSON.stringify(formData));
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile settings have been saved',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <TopNav />
      <Sidebar />
      <MainContent>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <User size={24} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-gray-400">Manage your public profile information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                placeholder="Your display name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition resize-none"
                placeholder="Tell others about yourself"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                placeholder="https://your-website.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discord
                </label>
                <input
                  type="text"
                  value={formData.discord}
                  onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                  placeholder="username#0000"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/20"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </MainContent>
    </div>
  );
}
