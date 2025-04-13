
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NotificationPanel from "./NotificationPanel";
import InboxPanel from "./InboxPanel";
import { useUniverse } from "@/contexts/UniverseContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { 
    isNotificationOpen, 
    setIsNotificationOpen, 
    isInboxOpen, 
    setIsInboxOpen 
  } = useUniverse();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <Sidebar isOpen={isSidebarOpen} />
      
      <main 
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
      
      <AnimatePresence>
        {isNotificationOpen && (
          <NotificationPanel onClose={() => setIsNotificationOpen(false)} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isInboxOpen && (
          <InboxPanel onClose={() => setIsInboxOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
