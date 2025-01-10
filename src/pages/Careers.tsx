import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

const Careers = () => {
  const [mdxContent, setMdxContent] = useState<any>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await import('../content/careers/getting-started-career.mdx');
        setMdxContent(content.default);
      } catch (error) {
        console.error('Error loading MDX content:', error);
      }
    };
    loadContent();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 px-4 md:px-8 lg:px-16 bg-background text-foreground">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Film Industry Careers</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            {mdxContent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-lg p-6 shadow-lg"
              >
                {mdxContent}
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