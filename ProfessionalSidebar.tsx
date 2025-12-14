// web/src/components/layout/ProfessionalSidebar.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
  ChartBarIcon,
  BoltIcon,
  ClockIcon,
  GiftIcon,
  PaintBrushIcon,
  UserIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  WalletIcon,
  BellIcon,
  HeartIcon,
  TagIcon,
  TrophyIcon,
  CpuChipIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    current: false,
  },
  {
    name: 'Explore',
    href: '/discover',
    icon: MagnifyingGlassIcon,
    current: false,
  },
  {
    name: 'Collections',
    href: '/collections',
    icon: RectangleStackIcon,
    current: false,
  },
  {
    name: 'Auctions',
    href: '/dashboard',
    icon: BoltIcon,
    current: false,
    badge: 'Live',
  },
  {
    name: 'Activity',
    href: '/activity',
    icon: ClockIcon,
    current: false,
  },
];

const marketplace = [
  {
    name: 'Create',
    href: '/create',
    icon: PaintBrushIcon,
  },
  {
    name: 'Drops',
    href: '/drops',
    icon: GiftIcon,
  },
  {
    name: 'Stats',
    href: '/stats',
    icon: ChartBarIcon,
  },
  {
    name: 'Rankings',
    href: '/rankings',
    icon: TrophyIcon,
  },
];

const account = [
  {
    name: 'Profile',
    href: '/me',
    icon: UserIcon,
  },
  {
    name: 'Favorites',
    href: '/favorites',
    icon: HeartIcon,
  },
  {
    name: 'Watchlist',
    href: '/watchlist',
    icon: TagIcon,
  },
  {
    name: 'My Bids',
    href: '/bids',
    icon: CpuChipIcon,
  },
];

const resources = [
  {
    name: 'Help Center',
    href: '/help',
    icon: BookOpenIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
];

interface ProfessionalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfessionalSidebar({ isOpen, onClose }: ProfessionalSidebarProps) {
  const router = useRouter();
  const [marketplaceOpen, setMarketplaceOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const isCurrentPath = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BidStream</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            <nav className="space-y-8">
              {/* Main Navigation */}
              <div>
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const current = isCurrentPath(item.href);
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`sidebar-item ${current ? 'active' : ''}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                          }}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <span className="badge badge-success">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Marketplace Section */}
              <div>
                <button
                  onClick={() => setMarketplaceOpen(!marketplaceOpen)}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {marketplaceOpen ? (
                    <ChevronDownIcon className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Marketplace
                  </span>
                </button>
                {marketplaceOpen && (
                  <ul className="mt-2 space-y-1">
                    {marketplace.map((item) => {
                      const current = isCurrentPath(item.href);
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`sidebar-item ${current ? 'active' : ''}`}
                            onClick={() => {
                              if (window.innerWidth < 1024) onClose();
                            }}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Account Section */}
              <div>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {accountOpen ? (
                    <ChevronDownIcon className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Account
                  </span>
                </button>
                {accountOpen && (
                  <ul className="mt-2 space-y-1">
                    {account.map((item) => {
                      const current = isCurrentPath(item.href);
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`sidebar-item ${current ? 'active' : ''}`}
                            onClick={() => {
                              if (window.innerWidth < 1024) onClose();
                            }}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Resources Section */}
              <div>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {resourcesOpen ? (
                    <ChevronDownIcon className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Resources
                  </span>
                </button>
                {resourcesOpen && (
                  <ul className="mt-2 space-y-1">
                    {resources.map((item) => {
                      const current = isCurrentPath(item.href);
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`sidebar-item ${current ? 'active' : ''}`}
                            onClick={() => {
                              if (window.innerWidth < 1024) onClose();
                            }}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Connect Wallet
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Get started with BidStream
                </p>
              </div>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
                <WalletIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile Sidebar Toggle
export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
    >
      <Bars3Icon className="w-6 h-6" />
    </button>
  );
}