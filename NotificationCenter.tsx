// web/src/components/NotificationCenter.tsx
import { useState, useEffect } from 'react';
import { Bell, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useAccount } from 'wagmi';

type NotificationType = 'bid' | 'outbid' | 'agent_action' | 'auction_end' | 'system';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  auctionId?: number;
  auctionName?: string;
  amount?: string;
  timestamp: Date;
  read: boolean;
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { addToast } = useToast();
  const { address, isConnected } = useAccount();

  // Simulate real-time notifications when connected
  useEffect(() => {
    if (!isConnected) {
      setNotifications([]);
      return;
    }

    // Add initial notifications for demo
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'bid',
        title: 'Wallet Connected',
        message: 'Successfully connected to Monad network',
        timestamp: new Date(),
        read: false,
      },
    ];
    setNotifications(initialNotifications);

    // Simulate periodic notifications
    const interval = setInterval(() => {
      const types: NotificationType[] = ['bid', 'outbid', 'agent_action', 'auction_end'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: randomType,
        title: getNotificationTitle(randomType),
        message: getNotificationMessage(randomType),
        timestamp: new Date(),
        read: false,
      };

      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
      
      // Show toast for new notification
      addToast({
        type: randomType === 'auction_end' ? 'success' : randomType === 'outbid' ? 'warning' : 'info',
        title: newNotification.title,
        message: newNotification.message,
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, addToast]);

  const getNotificationTitle = (type: NotificationType) => {
    switch (type) {
      case 'bid': return 'Bid Placed';
      case 'outbid': return 'Outbid Alert';
      case 'agent_action': return 'Agent Activity';
      case 'auction_end': return 'Auction Ended';
      default: return 'Notification';
    }
  };

  const getNotificationMessage = (type: NotificationType) => {
    switch (type) {
      case 'bid': return 'Your bid was successfully placed';
      case 'outbid': return 'You have been outbid on an auction';
      case 'agent_action': return 'Your agent placed a bid automatically';
      case 'auction_end': return 'An auction you participated in has ended';
      default: return 'You have a new notification';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'bid': return 'text-emerald-400';
      case 'outbid': return 'text-red-400';
      case 'agent_action': return 'text-cyan-400';
      case 'auction_end': return 'text-orange-400';
      case 'system': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'bid': return '💰';
      case 'outbid': return '⚠️';
      case 'agent_action': return '🤖';
      case 'auction_end': return '🏁';
      case 'system': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        <Bell className="h-4 w-4 text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-100">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-slate-800"
                >
                  <X className="h-3 w-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-slate-400">
                <div className="text-2xl mb-2">🔔</div>
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-slate-800/50 transition-colors ${!notification.read ? 'bg-slate-800/30' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-slate-200 truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-cyan-400 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>
                            {notification.auctionName && `${notification.auctionName} • `}
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                            className="p-1 rounded hover:bg-slate-700 opacity-50 hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}