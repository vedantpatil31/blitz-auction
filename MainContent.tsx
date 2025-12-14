// web/src/components/layout/MainContent.tsx
import { useSidebar } from '../../contexts/SidebarContext';

type MainContentProps = {
  children: React.ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  const { collapsed } = useSidebar();

  return (
    <main className={`pt-16 p-8 transition-all duration-300 ${
      collapsed ? 'ml-16' : 'ml-64'
    }`}>
      {children}
    </main>
  );
}
