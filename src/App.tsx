import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Articles from "./pages/Articles";
import ArticleView from "./pages/ArticleView";
import Collaborate from "./pages/Collaborate";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<ArticleView />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleView />} />
        <Route path="/collaborate" element={<Collaborate />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" attribute="class">
      <TooltipProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;