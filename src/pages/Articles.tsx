import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "@/types/metadata";
import { ArticleFilters } from "@/components/ArticleFilters";
import type { ArticleFilters as Filters } from "@/components/ArticleFilters";
import MDXVideo from "@/components/MDXVideo";
import { Link } from "react-router-dom";
import { getArticleMetadata } from "@/utils/articleUtils";

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [articles, setArticles] = useState<Metadata[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
  });

  useEffect(() => {
    const loadArticles = async () => {
      const metadata = await getArticleMetadata();
      setArticles(metadata);
    };
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !filters.search ||
      article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      article.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category || article.category === filters.category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cinema-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ArticleFilters onFiltersChange={setFilters} />
          </div>
          
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-white mb-8">Articles</h1>
            
            {filteredArticles.length === 0 ? (
              <p className="text-gray-400">No articles found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article) => (
                  <Link 
                    to={`/articles/${article.title.toLowerCase().replace(/ /g, "-")}`}
                    key={article.title}
                  >
                    <Card
                      className="bg-cinema-gray border-cinema-gray/20 overflow-hidden hover:border-cinema-gold/50 transition-colors"
                    >
                      <div className="aspect-video w-full overflow-hidden">
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
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white">{article.title}</CardTitle>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;