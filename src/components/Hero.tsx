import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cinema-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/90 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
          alt="Cinema"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Discover the Magic of
          <span className="text-cinema-gold block mt-2">Cinema</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore in-depth reviews, articles, and behind-the-scenes content from the world of film.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-black font-semibold px-8 py-6"
          >
            Latest Reviews
          </Button>
          <Button
            variant="outline"
            className="border-cinema-gold text-cinema-gold hover:bg-cinema-gold/10"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;