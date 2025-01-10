import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CareerSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CareerSearch = ({ searchQuery, onSearchChange }: CareerSearchProps) => (
  <div className="relative max-w-xl mx-auto mb-8">
    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
    <Input
      placeholder="Search career articles..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-10"
    />
  </div>
);

export default CareerSearch;