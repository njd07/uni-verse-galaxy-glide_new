
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  DollarSign, 
  GraduationCap, 
  Users, 
  Brain,
  User,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    {
      name: "StudySphere",
      path: "/study-sphere",
      icon: <GraduationCap className="w-5 h-5" />,
      gradient: "from-universe-neonBlue to-blue-500"
    },
    {
      name: "SpendStar",
      path: "/spend-star",
      icon: <DollarSign className="w-5 h-5" />,
      gradient: "from-universe-neonPurple to-purple-500"
    },
    {
      name: "KnowledgeNebula",
      path: "/knowledge-nebula",
      icon: <BookOpen className="w-5 h-5" />,
      gradient: "from-blue-500 to-universe-neonBlue"
    },
    {
      name: "StarConnect",
      path: "/star-connect",
      icon: <Users className="w-5 h-5" />,
      gradient: "from-universe-neonPurple to-universe-neonPink"
    },
    {
      name: "MindMoons",
      path: "/mind-moons",
      icon: <Brain className="w-5 h-5" />,
      gradient: "from-universe-neonBlue to-universe-neonPurple"
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="w-5 h-5" />,
      gradient: "from-gray-400 to-gray-600"
    },
    {
      name: "Friends",
      path: "/friends",
      icon: <UserPlus className="w-5 h-5" />,
      gradient: "from-green-400 to-green-600"
    }
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="fixed top-0 left-0 z-20 h-full w-64 pt-16 bg-universe-darker border-r border-universe-card overflow-y-auto"
    >
      <div className="p-4">
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center p-3 rounded-lg hover:bg-universe-card transition-all duration-200 group",
                currentPath === link.path ? "bg-universe-card" : "",
                currentPath === link.path ? "gradient-border" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r",
                  link.gradient
                )}
              >
                {link.icon}
              </div>
              <span className="ml-3 font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
