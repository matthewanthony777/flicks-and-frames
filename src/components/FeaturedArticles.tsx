import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const articles = [
  {
    title: "The Evolution of Cinema",
    category: "Film History",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
    description: "Exploring the journey from silent films to modern blockbusters.",
  },
  {
    title: "Art of Cinematography",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    description: "Understanding the visual language of film.",
  },
  {
    title: "Directors Who Changed Film",
    category: "Analysis",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
    description: "A look at visionary filmmakers who redefined cinema.",
  },
];

const FeaturedArticles = () => {
  return (
    <section className="py-20 bg-cinema-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Articles</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive deep into the world of cinema with our carefully curated articles
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={article.title}
              className="bg-cinema-gray border-cinema-gray/20 hover:border-cinema-gold/50 transition-all duration-300 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-white hover:text-cinema-gold transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {article.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{article.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;