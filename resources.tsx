// web/src/pages/resources.tsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { useSidebar } from '../contexts/SidebarContext';
import { Book, FileText, Video, Code } from 'lucide-react';

export default function ResourcesPage() {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const resources = [
    { title: 'Getting Started Guide', type: 'Documentation', icon: Book, color: 'from-cyan-500 to-blue-500' },
    { title: 'API Documentation', type: 'Developer Docs', icon: Code, color: 'from-purple-500 to-pink-500' },
    { title: 'Video Tutorials', type: 'Learn', icon: Video, color: 'from-green-500 to-emerald-500' },
    { title: 'Whitepaper', type: 'Technical', icon: FileText, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TopBar />
      <Sidebar />
      <main className={`transition-all duration-300 ease-in-out pt-14 ${
        collapsed ? 'ml-16' : 'ml-56'
      }`}>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">Resources</h1>
            <p className="text-gray-400">Learn more about BidStream and Monad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <div key={resource.title} className="premium-card p-6 space-y-4 hover:scale-105 transition-transform cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-400">{resource.type}</p>
                  </div>
                  <button className="btn-secondary w-full text-sm">
                    View Resource
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
