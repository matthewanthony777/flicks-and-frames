import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import MDXVideo from "@/components/MDXVideo";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Metadata } from "@/types/metadata";
import { getArticleMetadata } from "@/utils/articleUtils";

const ArticleView = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Metadata | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      const articles = await getArticleMetadata();
      const foundArticle = articles.find(
        (article) => article.title.toLowerCase().replace(/ /g, "-") === slug
      );
      if (foundArticle) {
        setArticle(foundArticle);
      }
    };
    loadArticle();
  }, [slug]);

  if (!article) {
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
            <p className="text-white">Article not found.</p>
          </Card>
        </div>
      </div>
    );
  }

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
            {article.title === "All Things Christopher" ? (
              <>
                <h1 className="text-3xl font-bold text-white mt-8 mb-4">Christopher Nolan's Mastery of Temporal Narratives</h1>
                <p className="text-gray-300">Christopher Nolan has established himself as a master of temporal manipulation in cinema, weaving complex narratives that challenge our perception of time. His filmography demonstrates a consistent fascination with time as both a narrative device and a philosophical concept.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Key Films and Their Temporal Elements</h2>

                <h3 className="text-xl font-bold text-white mt-6 mb-3">Memento (2000)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Reverse chronological storytelling</li>
                  <li>Short-term memory loss as a narrative device</li>
                  <li>Time as an unreliable construct</li>
                </ul>

                <h3 className="text-xl font-bold text-white mt-6 mb-3">Inception (2010)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Layered dream time</li>
                  <li>Time dilation across different consciousness levels</li>
                  <li>The relationship between perception and temporal reality</li>
                </ul>

                <div className="my-8">
                  <MDXVideo 
                    src="/chris-nolan-edit.mp4"
                    title="Christopher Nolan Film Edit"
                    className="w-full"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mt-6 mb-3">Interstellar (2014)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Relativistic time dilation</li>
                  <li>Time as a physical dimension</li>
                  <li>Emotional cost of temporal displacement</li>
                </ul>

                <h3 className="text-xl font-bold text-white mt-6 mb-3">Tenet (2020)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Temporal inversion</li>
                  <li>Entropy and time's arrow</li>
                  <li>Parallel temporal movements</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Recurring Themes</h2>

                <ol className="list-decimal pl-6 space-y-4 text-gray-300">
                  <li>
                    <strong>Non-linear Storytelling</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Fragmented narratives</li>
                      <li>Multiple timelines</li>
                      <li>Interconnected moments</li>
                    </ul>
                  </li>

                  <li>
                    <strong>Subjective Time</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Personal perception versus objective reality</li>
                      <li>Memory's role in temporal experience</li>
                      <li>Emotional weight of time</li>
                    </ul>
                  </li>

                  <li>
                    <strong>Technical Innovation</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Practical effects to represent time</li>
                      <li>Visual metaphors for temporal concepts</li>
                      <li>Sound design supporting temporal shifts</li>
                    </ul>
                  </li>
                </ol>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Conclusion</h2>
                <p className="text-gray-300">Nolan's exploration of time transcends mere narrative tricks, becoming a fundamental aspect of his cinematic language. His works continue to challenge audiences' understanding of temporal reality while pushing the boundaries of storytelling in film.</p>
              </>
            ) : (
              <>
                <p className="text-gray-300">Welcome to the wonderful world of cinema! This guide will help you understand the basics of filmmaking and appreciation.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">What is Cinema?</h2>
                <p className="text-gray-300">Cinema is more than just moving pictures. It's an art form that combines visual storytelling, sound, and narrative to create compelling experiences.</p>

                <div className="my-8">
                  <MDXVideo 
                    src="/chris-nolan-edit.mp4"
                    title="Christopher Nolan Film Edit"
                    className="w-full"
                  />
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                  alt="Film Production Setup"
                  className="w-full rounded-lg my-8"
                />

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Basic Film Terminology</h2>
                <ol className="list-decimal pl-6 space-y-2 text-gray-300">
                  <li><strong>Cinematography</strong>: The art of capturing moving images</li>
                  <li><strong>Mise-en-scène</strong>: Everything that appears in the frame</li>
                  <li><strong>Montage</strong>: The art of editing and arranging shots</li>
                </ol>

                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Camera Equipment"
                  className="w-full rounded-lg my-8"
                />

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Power of Visual Storytelling</h2>
                <p className="text-gray-300">Visual storytelling is at the heart of filmmaking. It's about conveying emotions and narratives through images.</p>

                <div className="my-8">
                  <MDXVideo 
                    src="/chris-nolan-edit.mp4"
                    title="Visual Storytelling Example"
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ArticleView;