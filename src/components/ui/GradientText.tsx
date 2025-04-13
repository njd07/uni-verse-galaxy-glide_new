
import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  gradient?: "blue" | "purple" | "pink" | "blue-purple" | "purple-pink" | "blue-pink";
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const GradientText: React.FC<GradientTextProps> = ({
  gradient = "blue-purple",
  glow = true,
  children,
  className,
  element = "h2",
}) => {
  const gradientClasses = {
    blue: "from-universe-neonBlue to-blue-500",
    purple: "from-universe-neonPurple to-purple-500",
    pink: "from-universe-neonPink to-pink-500",
    "blue-purple": "from-universe-neonBlue to-universe-neonPurple",
    "purple-pink": "from-universe-neonPurple to-universe-neonPink",
    "blue-pink": "from-universe-neonBlue to-universe-neonPink",
  };

  const glowClasses = {
    blue: "text-shadow-blue",
    purple: "text-shadow-purple",
    pink: "text-shadow-pink",
    "blue-purple": "text-shadow-blue",
    "purple-pink": "text-shadow-purple",
    "blue-pink": "text-shadow-pink",
  };

  const Component = element;

  return (
    <Component
      className={cn(
        "font-bold bg-gradient-to-r bg-clip-text text-transparent",
        gradientClasses[gradient],
        glow && glowClasses[gradient],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default GradientText;
