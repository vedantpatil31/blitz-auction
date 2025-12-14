// web/src/components/layout/ModernSidebar.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { 
  Home,
  Compass, 
  Grid3x3, 
  ArrowLeftRight, 
  Coins, 
  Zap, 
  Activity, 
  Gift, 
  Palette, 
  User, 
  Book, 
  Settings,
  ChevronDown,
  ChevronRight,
  Bot,
  Trophy,
  TrendingUp,
  Sparkles,
  X,
  Menu
} from 'lucide-react';
import Link from 'next/link';

const navigation = [
  {
    title: 'Main',
    items: [
      { name: 'Home', icon: Home, href: '/', badge: null },
      { name: 'Blitz Arena', icon: Zap, href: '/dashboard', badge: 'Live' },
      { name: 'Discover', icon: Compass, href: '/discover', badge: null },
      { name: 'Collections', icon: Grid3x3, href: '/collections', badge: null },
      { name: 'Activity', icon: Activity, href: '/activity', badge: null },
    ]
  },
  {
    title: 'Trading',
    items: [
      { name: 'AutoBid', icon: Bot, href: '/autobid', badge: 'AI' },
      { name: 'Swap', icon: ArrowLeftRight, href: '/swap', badge: null },
      { name: 'Tokens', icon: Coins, href: '/tokens', badge: null },
      { name: 'Rewards', icon: Gift, href: '/rewards', badge: 'New' },
    ]
  },
  {
    title: 'Create',
    items: [
      { name: 'Studio', icon: Palette, href: '/studio', badge: null },
      { name: 'Drops', icon: TrendingUp, href: '/drops', badge: null },
    ]
  },
  {
    title: 'Account',
    items: [
      { name: 'Profile', icon: User, href: '/me', badge: null },
      { name: 'Resources', icon: Book, href: '/resources', badge: null },
    ]
  }
];

interface ModernSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModernSidebar({ isOpen, onClose }: ModernSidebarProps) {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 bottom-0 w-80 sidebar-modern z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">BidStream</h1>
                  <p className="text-xs text-gray-400">Monad Testnet</p>
                </div>
              </Link>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    {section.title}
                  </h3>
                  <nav className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`
                            sidebar-item flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-all duration-200 group
                            ${active 
                              ? 'active text-purple-400 font-medium' 
                              : 'text-gray-400 hover:text-gray-200'
                            }
                          `}
                          onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={20} className={`transition-transform duration-200 ${
                              active ? 'scale-110' : 'group-hover:scale-105'
                            }`} />
                            <span>{item.name}</span>
                          </div>
                          
                          {item.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              item.badge === 'Live' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                              item.badge === 'AI' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                              item.badge === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}

              {/* Settings Expandable */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Settings
                </h3>
                <div>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="sidebar-item flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm text-gray-400 hover:text-gray-200 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Settings size={20} />
                      <span>Settings</span>
                    </div>
                    {settingsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    settingsOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="ml-6 space-y-1">
                      <Link 
                        href="/settings/profile" 
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all duration-200"
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                      >
                        Profile
                      </Link>
                      <Link 
                        href="/settings/wallets" 
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all duration-200"
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                      >
                        Linked Wallets
                      </Link>
                      <Link 
                        href="/settings/notifications" 
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all duration-200"
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                      >
                        Notifications
                      </Link>
                      <Link 
                        href="/settings/developer" 
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/5 transition-all duration-200"
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                      >
                        Developer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Your Rank</p>
                  <p className="text-xs text-gray-400">#247 • Top 5%</p>
                </div>
              </div>
              
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Volume:</span>
                  <span className="text-white font-semibold">45.2 MON</span>
                </div>
                <div className="flex justify-between">
                  <span>Wins:</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Win Rate:</span>
                  <span className="text-green-400 font-semibold">67%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Mobile Sidebar Toggle Button
export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 z-50 p-3 rounded-xl glass-card border border-white/20 text-white hover:border-purple-500/50 transition lg:hidden"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}