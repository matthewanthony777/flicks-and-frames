import Hero from "../components/Hero";
import FeaturedArticles from "../components/FeaturedArticles";
import Newsletter from "../components/Newsletter";
import PageTransition from "../components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cinema-black text-white">
        <Hero />
        <FeaturedArticles />
        <Newsletter />
      </div>
    </PageTransition>
  );
};

export default Index;