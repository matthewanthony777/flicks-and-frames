import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Users, Home, NewspaperIcon, Briefcase, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import SocialLinks from "./SocialLinks";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { 
      name: "Home", 
      href: "/", 
      icon: <Home className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> 
    },
    { 
      name: "Articles", 
      href: "/articles", 
      icon: <NewspaperIcon className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> 
    },
    { 
      name: "Resources", 
      href: "/resources", 
      icon: <BookOpen className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> 
    },
    { 
      name: "Careers", 
      href: "/careers", 
      icon: <Briefcase className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> 
    },
    { 
      name: "Collaborate", 
      href: "/collaborate", 
      icon: <Users className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> 
    },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-cinema-black/90 backdrop-blur-md z-50 border-b border-cinema-gray/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-cinema-gold font-semibold text-xl">
                CineVerse
              </a>
            </div>
            
            <div className="hidden md:flex md:items-center">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-cinema-gold px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center group"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                ))}
              </div>
              
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-6 text-gray-300 hover:text-cinema-gold"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  ) : (
                    <Moon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  )}
                </Button>
              )}
            </div>

            <div className="md:hidden flex items-center">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mr-2 text-gray-300 hover:text-cinema-gold"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  ) : (
                    <Moon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-cinema-black/95 backdrop-blur-md animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-cinema-gold block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
      <SocialLinks />
    </>
  );
};

export default Navigation;