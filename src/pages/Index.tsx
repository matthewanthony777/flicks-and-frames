import Hero from "../components/Hero";
import FeaturedArticles from "../components/FeaturedArticles";
import Newsletter from "../components/Newsletter";
import PageTransition from "../components/PageTransition";
import SocialLinks from "../components/SocialLinks";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cinema-black text-white">
        <Hero />
        <FeaturedArticles />
        <Newsletter />
        <SocialLinks />
      </div>
    </PageTransition>
  );
};

export default Index;