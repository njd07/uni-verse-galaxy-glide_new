
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import {
  GraduationCap,
  DollarSign,
  BookOpen,
  Users,
  Brain,
} from "lucide-react";

const Index = () => {
  const orbits = [
    {
      name: "StudySphere",
      description: "Manage your academic life",
      path: "/study-sphere",
      icon: <GraduationCap className="w-8 h-8" />,
      gradient: "blue",
    },
    {
      name: "SpendStar",
      description: "Track your finances",
      path: "/spend-star",
      icon: <DollarSign className="w-8 h-8" />,
      gradient: "purple" as const,
    },
    {
      name: "KnowledgeNebula",
      description: "Access learning resources",
      path: "/knowledge-nebula",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "blue" as const,
    },
    {
      name: "StarConnect",
      description: "Connect with campus life",
      path: "/star-connect",
      icon: <Users className="w-8 h-8" />,
      gradient: "purple-pink" as const,
    },
    {
      name: "MindMoons",
      description: "Focus on mental wellbeing",
      path: "/mind-moons",
      icon: <Brain className="w-8 h-8" />,
      gradient: "blue-purple" as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <GradientText
          gradient="blue-pink"
          element="h1"
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Uni-Verse
        </GradientText>
        <p className="text-gray-300 text-xl">
          Your Galaxy of Student Solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {orbits.map((orbit, index) => (
          <motion.div
            key={orbit.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={orbit.path}>
              <GlowingCard
                gradient={orbit.gradient as any}
                className="h-full"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    orbit.gradient === "blue" 
                      ? "bg-universe-neonBlue bg-opacity-20" 
                      : orbit.gradient === "purple"
                      ? "bg-universe-neonPurple bg-opacity-20"
                      : "bg-gradient-blue-purple bg-opacity-50"
                  } mb-4`}>
                    {orbit.icon}
                  </div>
                  <GradientText
                    gradient={orbit.gradient as any}
                    element="h3"
                    className="text-xl font-bold mb-2"
                  >
                    {orbit.name}
                  </GradientText>
                  <p className="text-gray-300">{orbit.description}</p>
                </div>
              </GlowingCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Index;
