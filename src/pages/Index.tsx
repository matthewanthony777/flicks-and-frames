import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import FeaturedArticles from "../components/FeaturedArticles";
import Newsletter from "../components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen bg-cinema-black text-white">
      <Navigation />
      <Hero />
      <FeaturedArticles />
      <Newsletter />
    </div>
  );
};

export default Index;