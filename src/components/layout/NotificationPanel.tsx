
import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { X, Bell, Calendar, CheckSquare, MessageSquare, UserPlus } from "lucide-react";
import { useUniverse } from "@/contexts/UniverseContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useUniverse();

  const panelVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <CheckSquare className="h-5 w-5 text-universe-neonBlue" />;
      case "exam":
      case "event":
        return <Calendar className="h-5 w-5 text-universe-neonPurple" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-universe-neonPink" />;
      case "friend":
        return <UserPlus className="h-5 w-5 text-green-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-80 z-40 bg-universe-dark border-r border-universe-card shadow-lg overflow-y-auto"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllNotificationsAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "p-3 rounded-lg bg-universe-card hover:shadow-neon transition-all duration-300 cursor-pointer",
                  notification.isRead ? "opacity-60" : "gradient-border"
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <span className="text-xs text-gray-400">
                        {format(notification.date, "h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {format(notification.date, "MMM d")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
