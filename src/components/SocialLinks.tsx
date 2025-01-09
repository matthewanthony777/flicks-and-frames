import { Youtube, Instagram } from "lucide-react";
import { Button } from "./ui/button";

const SocialLinks = () => {
  return (
    <footer className="bg-cinema-black py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-gray-400 hover:text-cinema-gold"
          >
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-gray-400 hover:text-cinema-gold"
          >
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-gray-400 hover:text-cinema-gold"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default SocialLinks;