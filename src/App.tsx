import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Articles from "./pages/Articles";
import ArticleView from "./pages/ArticleView";
import Collaborate from "./pages/Collaborate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleView />} />
            <Route path="/collaborate" element={<Collaborate />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;