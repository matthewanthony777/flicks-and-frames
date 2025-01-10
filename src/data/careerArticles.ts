export interface CareerArticle {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

export const mockCareerArticles: CareerArticle[] = [
  {
    title: "Getting Started in Film",
    description: "A comprehensive guide to starting your film career",
    date: "2024-03-15",
    author: "CineVerse Team",
    category: "Career Guide",
    slug: "getting-started-career"
  },
  {
    title: "Film Industry Career Paths",
    description: "Explore diverse career opportunities in the film industry",
    date: "2024-03-15",
    author: "CineVerse Team",
    category: "Careers",
    slug: "film-industry-careers"
  },
  {
    title: "Film Education Resources",
    description: "Educational resources and learning paths for aspiring filmmakers",
    date: "2024-03-15",
    author: "CineVerse Team",
    category: "Education",
    slug: "education-resources"
  }
];