
import React from "react";
import { Bell, Mail, UserCircle, Menu } from "lucide-react";
import { useUniverse } from "@/contexts/UniverseContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { 
    notifications, 
    isNotificationOpen, 
    setIsNotificationOpen, 
    isInboxOpen, 
    setIsInboxOpen,
    currentUser
  } = useUniverse();

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const unreadCount = unreadNotifications.length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-universe-darker bg-opacity-60 backdrop-blur-md border-b border-universe-card px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 text-white hover:bg-universe-card"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-blue-purple bg-clip-text text-transparent">
            Uni-Verse
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              if (isInboxOpen) setIsInboxOpen(false);
            }}
            className={cn(
              "text-white hover:bg-universe-card",
              isNotificationOpen && "bg-universe-card"
            )}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsInboxOpen(!isInboxOpen);
              if (isNotificationOpen) setIsNotificationOpen(false);
            }}
            className={cn(
              "text-white hover:bg-universe-card",
              isInboxOpen && "bg-universe-card"
            )}
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>
        <Link to="/profile">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-universe-card"
          >
            <UserCircle className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
