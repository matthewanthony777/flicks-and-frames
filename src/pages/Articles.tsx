import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "@/types/metadata";
import { ArticleFilters } from "@/components/ArticleFilters";
import type { ArticleFilters as Filters } from "@/components/ArticleFilters";

interface ArticleMetadata extends Metadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  category: string;
}

const mockArticles: ArticleMetadata[] = [
  {
    title: "Getting Started with Film",
    description: "An introduction to the world of cinema",
    date: "2024-03-14",
    tags: ["beginners", "film-basics", "cinema"],
    author: "Film Expert",
    category: "Film Articles",
  },
  {
    title: "The Art of Cinematography",
    description: "Understanding the visual language of film",
    date: "2024-03-14",
    tags: ["cinematography", "technical", "classic"],
    author: "Camera Expert",
    category: "Cinematography",
  },
  {
    title: "International Cinema Spotlight",
    description: "Exploring global film movements",
    date: "2024-03-14",
    tags: ["foreign", "indie", "contemporary"],
    author: "World Cinema Expert",
    category: "International Cinema",
  },
];

const Articles = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    tags: [],
  });

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      !filters.search ||
      article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      article.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category || article.category === filters.category;

    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.some((tag) => article.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesTags;
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
                  <Card
                    key={article.title}
                    className="bg-cinema-gray border-cinema-gray/20"
                  >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;