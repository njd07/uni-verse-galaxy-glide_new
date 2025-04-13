
import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement>, Partial<MotionProps> {
  gradient?: "blue" | "purple" | "pink" | "blue-purple" | "purple-pink" | "blue-pink";
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  gradient = "blue",
  hoverEffect = true,
  children,
  className,
  ...props
}) => {
  const gradientClasses = {
    blue: "hover:shadow-neon",
    purple: "hover:shadow-neon-purple",
    pink: "hover:shadow-neon-pink",
    "blue-purple": "hover:shadow-neon before:bg-gradient-blue-purple",
    "purple-pink": "hover:shadow-neon-purple before:bg-gradient-purple-pink",
    "blue-pink": "hover:shadow-neon-pink before:bg-gradient-blue-pink",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "universe-card gradient-border",
        hoverEffect && "universe-card-hover",
        hoverEffect && gradientClasses[gradient],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlowingCard;
