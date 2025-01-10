import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageTransition from "../components/PageTransition";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CareerArticle {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

const mockCareerArticles: CareerArticle[] = [
  {
    title: "Getting Started in Film",
    description: "A comprehensive guide to starting your film career",
    date: "2024-03-15",
    author: "CineVerse Team",
    category: "Career Guide",
    slug: "getting-started-career"
  },
  {
    title: "Film Industry Career Paths",
    description: "Explore diverse career opportunities in the film industry",
    date: "2024-03-15",
    author: "CineVerse Team",
    category: "Careers",
    slug: "film-industry-careers"
  },
  {
    title: "Film Education Resources",
    description: "Educational resources and learning paths for aspiring filmmakers",
    date: "2024-03-15",
    author: "CineVerse Team",
    category: "Education",
    slug: "education-resources"
  }
];

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = mockCareerArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-cinema-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Film Industry Careers</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore career opportunities in the film industry, from production and direction
              to technical roles and creative positions. Find educational resources and
              professional development guidance to help you build your career in cinema.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link 
                to={`/careers/${article.slug}`}
                key={article.slug}
              >
                <Card
                  className="bg-cinema-gray border-cinema-gray/20 hover:border-cinema-gold/50 transition-all duration-300 animate-slideUp h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
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

          {filteredArticles.length === 0 && (
            <p className="text-center text-gray-400 mt-8">
              No articles found matching your search criteria.
            </p>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Careers;