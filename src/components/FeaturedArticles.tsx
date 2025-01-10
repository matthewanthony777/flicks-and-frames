import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import MDXVideo from "./MDXVideo";
import { useEffect, useState } from "react";
import { Metadata } from "@/types/metadata";
import { getArticleMetadata } from "@/utils/articleUtils";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Metadata[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      const metadata = await getArticleMetadata();
      setArticles(metadata);
    };
    loadArticles();
  }, []);

  // Sort articles by date in descending order (most recent first)
  const sortedArticles = [...articles].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Take only the 3 most recent articles
  const recentArticles = sortedArticles.slice(0, 3);

  return (
    <section className="py-20 bg-cinema-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay up to date with our most recent publications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArticles.map((article, index) => (
            <Link 
              to={`/articles/${article.title.toLowerCase().replace(/ /g, "-")}`}
              key={article.title}
            >
              <Card
                className="bg-cinema-gray border-cinema-gray/20 hover:border-cinema-gold/50 transition-all duration-300 animate-slideUp h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  {article.coverVideo ? (
                    <MDXVideo
                      src={article.coverVideo}
                      title={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  ) : null}
                </div>
                <CardHeader>
                  <CardTitle className="text-white hover:text-cinema-gold transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {article.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{article.description}</p>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/articles">
            <Button 
              variant="outline" 
              className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold hover:text-white"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;