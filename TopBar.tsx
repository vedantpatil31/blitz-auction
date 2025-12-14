// web/src/components/layout/TopBar.tsx
import { Menu, Bell, Search } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

export function TopBar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f1420]/95 backdrop-blur-xl border-b border-[#2a3142] z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCollapsed}
            className="lg:hidden p-2 rounded-lg hover:bg-[#1f2535] text-gray-400 hover:text-white transition-all duration-200"
          >
            <Menu size={20} />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search auctions, collections..."
              className="w-56 lg:w-80 pl-9 pr-4 py-2 bg-[#1a1f2e] border border-[#2a3142] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Live Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-semibold text-green-300">Live</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[#1f2535] text-gray-400 hover:text-white transition-all duration-200">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>

          {/* Connect Wallet Button */}
          <button className="btn-primary px-4 py-2 text-sm">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
