// web/src/components/layout/Sidebar.tsx
import { useRouter } from 'next/router';
import { 
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
  Bot
} from 'lucide-react';
import { useState } from 'react';
import { useSidebar } from '../../contexts/SidebarContext';

const navigation = [
  {
    title: 'Main',
    items: [
      { name: 'Discover', icon: Compass, href: '/discover' },
      { name: 'Collections', icon: Grid3x3, href: '/collections' },
      { name: 'Swap', icon: ArrowLeftRight, href: '/swap' },
      { name: 'Tokens', icon: Coins, href: '/tokens' },
      { name: 'Drops', icon: Zap, href: '/drops' },
      { name: 'Activity', icon: Activity, href: '/activity' },
      { name: 'AutoBid', icon: Bot, href: '/autobid' },
      { name: 'Rewards', icon: Gift, href: '/rewards' },
      { name: 'Studio', icon: Palette, href: '/studio' },
    ]
  },
  {
    title: 'Profile',
    items: [
      { name: 'Profile', icon: User, href: '/me' },
    ]
  },
  {
    title: 'Resources',
    items: [
      { name: 'Resources', icon: Book, href: '/resources' },
    ]
  }
];

export function Sidebar() {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { collapsed, setCollapsed } = useSidebar();

  const isActive = (href: string) => router.pathname === href;

  return (
    <aside className={`fixed left-0 top-14 bottom-0 bg-[#0f1420] border-r border-[#2a3142] overflow-y-auto transition-all duration-300 ease-in-out z-40 ${
      collapsed ? 'w-16' : 'w-56'
    }`}>
      <div className="p-3">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between gap-3 px-3 py-2 mb-6">
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
              <span className="text-white font-bold text-sm">BS</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}>
              <div className="text-sm font-semibold text-white whitespace-nowrap">BidStream</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">Monad Testnet</div>
            </div>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-[#1f2535] text-gray-400 hover:text-white transition-all duration-200 flex-shrink-0 group"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <div className={`transform transition-transform duration-300 ${
              collapsed ? 'rotate-0' : 'rotate-180'
            }`}>
              <ChevronRight size={16} className="group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>

        {/* Navigation Sections */}
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <div className={`overflow-hidden transition-all duration-300 ${
              collapsed ? 'h-0 opacity-0 mb-0' : 'h-auto opacity-100 mb-2'
            }`}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 whitespace-nowrap">
                {section.title}
              </h3>
            </div>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`
                      sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative overflow-hidden
                      ${collapsed ? 'justify-center' : ''}
                      ${active 
                        ? 'active text-cyan-400 font-medium bg-cyan-500/10 border-l-2 border-cyan-400' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#1f2535]'
                      }
                    `}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon size={18} className={`flex-shrink-0 transition-transform duration-200 ${
                      active ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <span className={`whitespace-nowrap transition-all duration-300 ${
                      collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    }`}>{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Settings Expandable */}
        <div className="mb-6">
          <div className={`overflow-hidden transition-all duration-300 ${
            collapsed ? 'h-0 opacity-0 mb-0' : 'h-auto opacity-100 mb-2'
          }`}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 whitespace-nowrap">
              Settings
            </h3>
          </div>
          <div>
            <button
              onClick={() => collapsed ? router.push('/settings') : setSettingsOpen(!settingsOpen)}
              className={`sidebar-item flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-[#1f2535] transition-all duration-200 ${
                collapsed ? 'justify-center' : ''
              }`}
              title={collapsed ? 'Settings' : undefined}
            >
              <div className="flex items-center gap-3">
                <Settings size={18} className="flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-300 ${
                  collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}>Settings</span>
              </div>
              <div className={`transition-all duration-300 ${
                collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}>
                {settingsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              !collapsed && settingsOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}>
              <div className="ml-6 space-y-1">
                <a href="/settings/profile" className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-[#1f2535] transition-all duration-200">
                  Profile
                </a>
                <a href="/settings/wallets" className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-[#1f2535] transition-all duration-200">
                  Linked Wallets
                </a>
                <a href="/settings/notifications" className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-[#1f2535] transition-all duration-200">
                  Email Notifications
                </a>
                <a href="/settings/developer" className="block px-3 py-2 text-sm text-gray-400 hover:text-gray-200 rounded-lg hover:bg-[#1f2535] transition-all duration-200">
                  Developer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
