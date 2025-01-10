import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import CareerHeader from "@/components/careers/CareerHeader";
import CareerSearch from "@/components/careers/CareerSearch";
import CareersList from "@/components/careers/CareersList";
import { mockCareerArticles } from "@/data/careerArticles";

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = mockCareerArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-cinema-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareerHeader />
          <CareerSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          {filteredArticles.length === 0 ? (
            <p className="text-center text-gray-400">
              No career articles found matching your search criteria.
            </p>
          ) : (
            <CareersList articles={filteredArticles} />
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Careers;