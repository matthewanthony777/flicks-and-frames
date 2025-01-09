import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";

export interface ArticleFilters {
  search: string;
  category: string;
  tags: string[];
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

const availableTags = [
  "drama",
  "action",
  "comedy",
  "documentary",
  "indie",
  "foreign",
  "classic",
  "contemporary",
  "experimental",
  "animation",
];

export const ArticleFilters = ({ onFiltersChange }: ArticleFiltersProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFiltersChange({
      search: value,
      category: selectedCategory,
      tags: selectedTags,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    onFiltersChange({
      search,
      category: category === selectedCategory ? "" : category,
      tags: selectedTags,
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFiltersChange({
      search,
      category: selectedCategory,
      tags: newTags,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedTags([]);
    onFiltersChange({
      search: "",
      category: "",
      tags: [],
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

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => handleTagToggle(tag)}
              className="text-sm"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {(search || selectedCategory || selectedTags.length > 0) && (
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