
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: "blue" | "purple" | "pink" | "blue-purple" | "purple-pink" | "blue-pink";
  size?: "sm" | "md" | "lg";
  pulseEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  gradient = "blue-purple",
  size = "md",
  pulseEffect = false,
  children,
  className,
  ...props
}) => {
  const gradientClasses = {
    blue: "bg-universe-neonBlue hover:bg-blue-600 shadow-neon",
    purple: "bg-universe-neonPurple hover:bg-purple-600 shadow-neon-purple",
    pink: "bg-universe-neonPink hover:bg-pink-600 shadow-neon-pink",
    "blue-purple": "bg-gradient-blue-purple shadow-neon",
    "purple-pink": "bg-gradient-purple-pink shadow-neon-purple",
    "blue-pink": "bg-gradient-blue-pink shadow-neon-pink",
  };

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-5",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "text-white font-medium rounded-lg transition-all duration-300",
        gradientClasses[gradient],
        sizeClasses[size],
        pulseEffect && "animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GradientButton;
