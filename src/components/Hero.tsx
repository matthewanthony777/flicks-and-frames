import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Preload the video when component mounts
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cinema-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/90 to-transparent" />
        <div className="w-full h-full">
          {/* For YouTube video */}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/6hNlpOSDr1w?si=QcBsfx8aNi8IrjT7&start=5&autoplay=1&mute=1&controls=0&loop=1&playlist=6hNlpOSDr1w" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none hidden"
            loading="lazy"
          />
          
          {/* For local video files */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/chris-nolan-edit.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
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