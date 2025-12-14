// web/src/pages/settings/notifications.tsx
import { useState, useEffect } from 'react';
import { TopNav } from '../../components/layout/TopNav';
import { Sidebar } from '../../components/layout/Sidebar';
import { MainContent } from '../../components/layout/MainContent';
import { Bell, Mail, Save } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useToast } from '../../contexts/ToastContext';

export default function NotificationsSettingsPage() {
  const { address } = useAccount();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [settings, setSettings] = useState({
    auctionWins: true,
    outbidAlerts: true,
    newAuctions: false,
    agentActivity: true,
    weeklyDigest: true,
  });

  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`notifications_${address}`);
      if (saved) {
        const data = JSON.parse(saved);
        setSettings(data.settings || settings);
        setEmail(data.email || '');
      }
    }
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      localStorage.setItem(`notifications_${address}`, JSON.stringify({ email, settings }));
      addToast({
        type: 'success',
        title: 'Settings Updated',
        message: 'Your notification preferences have been saved',
      });
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <TopNav />
      <Sidebar />
      <MainContent>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Bell size={24} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Email Notifications</h1>
              <p className="text-gray-400">Configure your email notification preferences</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1f2e] border border-[#2a3142] text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition"
                placeholder="your@email.com"
              />
              <p className="text-xs text-gray-500 mt-2">We'll send notifications to this email address</p>
            </div>

            <div className="border-t border-[#2a3142] pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { key: 'auctionWins', label: 'Auction Wins', desc: 'Get notified when you win an auction' },
                  { key: 'outbidAlerts', label: 'Outbid Alerts', desc: 'Alert when someone outbids you' },
                  { key: 'newAuctions', label: 'New Auctions', desc: 'Notify about new auctions matching your interests' },
                  { key: 'agentActivity', label: 'Agent Activity', desc: 'Updates about your autobid agents' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your weekly activity' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-[#1a1f2e]/50 border border-[#2a3142]">
                    <div>
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSetting(item.key as keyof typeof settings)}
                      className={`relative w-12 h-6 rounded-full transition ${
                        settings[item.key as keyof typeof settings] ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        settings[item.key as keyof typeof settings] ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/20"
              >
                <Save size={18} />
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </MainContent>
    </div>
  );
}
