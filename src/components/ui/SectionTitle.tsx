
import React from "react";
import GradientText from "./GradientText";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  gradient?: "blue" | "purple" | "pink" | "blue-purple" | "purple-pink" | "blue-pink";
  className?: string;
  description?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  gradient = "blue-purple",
  className,
  description,
}) => {
  return (
    <div className={cn("mb-6", className)}>
      <GradientText
        gradient={gradient}
        element="h2"
        className="text-2xl font-bold mb-2"
      >
        {title}
      </GradientText>
      {description && (
        <p className="text-gray-400">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
