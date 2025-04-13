
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UniverseProvider } from "@/contexts/UniverseContext";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import StudySphere from "./pages/StudySphere";
import SpendStar from "./pages/SpendStar";
import KnowledgeNebula from "./pages/KnowledgeNebula";
import StarConnect from "./pages/StarConnect";
import MindMoons from "./pages/MindMoons";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UniverseProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/study-sphere" element={<StudySphere />} />
                <Route path="/spend-star" element={<SpendStar />} />
                <Route path="/knowledge-nebula" element={<KnowledgeNebula />} />
                <Route path="/star-connect" element={<StarConnect />} />
                <Route path="/mind-moons" element={<MindMoons />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AnimatePresence>
        </BrowserRouter>
      </UniverseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
