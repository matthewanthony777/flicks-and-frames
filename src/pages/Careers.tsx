import React, { useState, useEffect } from "react";
import { MDXProvider } from '@mdx-js/react';
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// MDX components configuration with proper typing
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2" {...props} />
  ),
};

const Careers = () => {
  const [mdxContent, setMdxContent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await import('../content/careers/getting-started-career.mdx');
        setMdxContent(() => content.default);
        setError(null);
      } catch (err) {
        console.error('Error loading MDX content:', err);
        setError('Failed to load career content. Please try again later.');
      }
    };
    loadContent();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-16 bg-background text-foreground">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Film Industry Careers</h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-400 mb-6">
              Explore career opportunities in the film industry, from production and direction
              to technical roles and creative positions. Find educational resources, job listings,
              and professional development guidance to help you build your career in cinema.
            </p>

            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {error ? (
              <div className="text-destructive p-4 rounded-lg bg-destructive/10">
                {error}
              </div>
            ) : mdxContent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-lg p-6 shadow-lg"
              >
                <MDXProvider components={components}>
                  {React.createElement(mdxContent)}
                </MDXProvider>
              </motion.div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Careers;