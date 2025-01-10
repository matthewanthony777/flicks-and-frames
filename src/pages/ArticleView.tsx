import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import MDXVideo from "@/components/MDXVideo";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Metadata } from "@/types/metadata";
import { getArticleMetadata } from "@/utils/articleUtils";

const ArticleView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Metadata | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Map of normalized titles to actual filenames
        const fileMap: Record<string, string> = {
          'folk-horror': 'Robert-eggers',
          'all-things-christopher': 'chris-nolan-time',
          'getting-started-with-film': 'getting-started-with-film'
        };

        const articles = await getArticleMetadata();
        console.log("Available articles:", articles.map(a => a.title));
        
        const normalizedSlug = slug?.toLowerCase();
        console.log("Looking for article with normalized slug:", normalizedSlug);
        
        const foundArticle = articles.find((article) => {
          const normalizedTitle = article.title.toLowerCase().replace(/ /g, "-");
          return normalizedTitle === normalizedSlug;
        });
        
        if (!foundArticle) {
          console.error(`No article found matching slug: ${slug}`);
          setError("Article not found");
          return;
        }

        console.log("Found matching article:", foundArticle.title);
        setArticle(foundArticle);
        
        // Use the mapping to get the correct filename
        const normalizedTitle = foundArticle.title.toLowerCase().replace(/ /g, "-");
        const filename = fileMap[normalizedTitle] || normalizedTitle;
        console.log("Attempting to fetch MDX file:", filename);
        
        const response = await fetch(`https://raw.githubusercontent.com/matthewanthony777/flicks-and-frames/main/content/articles/${filename}.mdx`);
        
        if (!response.ok) {
          console.error(`Failed to fetch article content: ${response.statusText}`);
          setError("Failed to load article content");
          return;
        }

        const mdxContent = await response.text();
        setContent(mdxContent);
      } catch (error) {
        console.error("Error loading article:", error);
        setError("An error occurred while loading the article");
      }
    };
    loadArticle();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-cinema-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/articles">
              <Button variant="ghost" className="text-white hover:text-gray-300">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </Link>
          </div>
          <Card className="bg-cinema-gray border-cinema-gray/20 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
              <p className="text-gray-400 mb-6">The article you're looking for doesn't exist or couldn't be loaded.</p>
              <Button 
                onClick={() => navigate('/articles')}
                className="bg-primary hover:bg-primary/90"
              >
                Browse All Articles
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!article || !content) {
    return (
      <div className="min-h-screen bg-cinema-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/articles">
              <Button variant="ghost" className="text-white hover:text-gray-300">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </Link>
          </div>
          <Card className="bg-cinema-gray border-cinema-gray/20 p-8">
            <p className="text-white">Loading article...</p>
          </Card>
        </div>
      </div>
    );
  }

  // Extract the content part from the MDX file (remove frontmatter)
  const contentWithoutFrontmatter = content.split('---').slice(2).join('---').trim();

  return (
    <div className="min-h-screen bg-cinema-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/articles">
            <Button variant="ghost" className="text-white hover:text-gray-300">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>

        <Card className="bg-cinema-gray border-cinema-gray/20 p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
            <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
              <span>By {article.author}</span>
              <span>{article.date}</span>
            </div>
            <p className="text-gray-400">{article.description}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentWithoutFrontmatter }} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ArticleView;