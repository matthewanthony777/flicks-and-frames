import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "@/types/metadata";

interface ArticleMetadata extends Metadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  category: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch MDX files
    // For now, we'll use a mock article
    setArticles([
      {
        title: "Getting Started with Film",
        description: "An introduction to the world of cinema",
        date: "2024-03-14",
        tags: ["beginners", "film-basics", "cinema"],
        author: "Film Expert",
        category: "Film Articles",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-cinema-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.title} className="bg-cinema-gray border-cinema-gray/20">
              <CardHeader>
                <CardTitle className="text-white">{article.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-cinema-gold/20 text-cinema-gold px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{article.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;