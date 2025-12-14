// web/src/components/layout/AppLayout.tsx
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useSidebar } from '../../contexts/SidebarContext';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#0a0b0f]">
      <TopBar />
      <Sidebar />
      <main
        className={`transition-all duration-300 ease-in-out pt-16 ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
