import React, { useState, useEffect } from "react";
import { MDXProvider } from '@mdx-js/react';
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

interface CareerArticle {
  id: string;
  title: string;
  description: string;
  file_path: string;
  created_at: string;
}

const Careers = () => {
  const [mdxContent, setMdxContent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<CareerArticle[]>([]);
  const [isUploading, setIsUploading] = useState(false);
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
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('career_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching articles",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setArticles(data || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.mdx')) {
      toast({
        title: "Invalid file",
        description: "Please upload an MDX file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('career-articles')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('career_articles')
        .insert({
          title: file.name.replace('.mdx', ''),
          description: 'Career article',
          file_path: fileName,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Article uploaded successfully",
      });

      await fetchArticles();
    } catch (error: any) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    <Upload className="h-4 w-4" />
                    <span>Upload MDX</span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".mdx"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </Label>
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

          {filteredArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Uploaded Articles</h2>
              <div className="grid gap-6">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-6 bg-card rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-400">{article.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Uploaded on {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Careers;