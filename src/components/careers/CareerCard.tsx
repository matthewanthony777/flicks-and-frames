import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CareerArticle } from "@/data/careerArticles";

interface CareerCardProps {
  article: CareerArticle;
}

const CareerCard = ({ article }: CareerCardProps) => (
  <Link to={`/careers/${article.slug}`}>
    <Card className="bg-cinema-gray border-cinema-gray/20 hover:border-cinema-gold/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white hover:text-cinema-gold transition-colors">
          {article.title}
        </CardTitle>
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
);

export default CareerCard;