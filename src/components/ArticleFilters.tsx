import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";

export interface ArticleFilters {
  search: string;
  category: string;
}

interface ArticleFiltersProps {
  onFiltersChange: (filters: ArticleFilters) => void;
}

const categories = [
  "Film Reviews",
  "Film Articles",
  "Classic Cinema",
  "Film Festivals",
  "Cinematography",
  "Screenwriting",
  "Film Technology",
  "Actor Spotlights",
  "Film History",
  "Behind-the-Scenes",
  "International Cinema",
];

export const ArticleFilters = ({ onFiltersChange }: ArticleFiltersProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFiltersChange({
      search: value,
      category: selectedCategory,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    onFiltersChange({
      search,
      category: category === selectedCategory ? "" : category,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    onFiltersChange({
      search: "",
      category: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {(search || selectedCategory) && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-cinema-gold hover:text-cinema-gold/80"
        >
          <X className="h-4 w-4 mr-2" />
          Clear filters
        </Button>
      )}
    </div>
  );
};