import { CareerArticle } from "@/data/careerArticles";
import CareerCard from "./CareerCard";

interface CareersListProps {
  articles: CareerArticle[];
}

const CareersList = ({ articles }: CareersListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {articles.map((article) => (
      <CareerCard key={article.slug} article={article} />
    ))}
  </div>
);

export default CareersList;