import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "@/types/metadata";
import { ArticleFilters } from "@/components/ArticleFilters";
import type { ArticleFilters as Filters } from "@/components/ArticleFilters";
import MDXVideo from "@/components/MDXVideo";

interface ArticleMetadata extends Metadata {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  coverImage?: string;
  coverVideo?: string;
}

const mockArticles: ArticleMetadata[] = [
  {
    title: "Getting Started with Film",
    description: "An introduction to the world of cinema",
    date: "2024-03-14",
    author: "Film Expert",
    category: "Film Articles",
    coverVideo: "/chris-nolan-edit.mp4"
  },
  {
    title: "The Art of Cinematography",
    description: "Understanding the visual language of film",
    date: "2024-03-14",
    author: "Camera Expert",
    category: "Cinematography",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    title: "International Cinema Spotlight",
    description: "Exploring global film movements",
    date: "2024-03-14",
    author: "World Cinema Expert",
    category: "International Cinema",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
];

const Articles = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
  });

  const filteredArticles = mockArticles.filter((article) => {
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
                  <Card
                    key={article.title}
                    className="bg-cinema-gray border-cinema-gray/20 overflow-hidden"
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