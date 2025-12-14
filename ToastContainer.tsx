// web/src/components/ToastContainer.tsx
import { useToast } from '../contexts/ToastContext';
import { X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
      case 'error':
        return 'bg-red-500/10 border-red-500/30 text-red-300';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300';
      case 'info':
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm p-4 rounded-lg border backdrop-blur-sm shadow-lg animate-in slide-in-from-right-2 ${getToastStyles(toast.type)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs opacity-90 mt-1">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-1 rounded hover:bg-black/20 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}