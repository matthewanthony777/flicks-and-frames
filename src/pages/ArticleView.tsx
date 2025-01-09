import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import MDXVideo from "@/components/MDXVideo";

const ArticleView = () => {
  const { slug } = useParams();

  // For now, we'll just render the Getting Started article
  // In a real app, this would fetch the correct MDX content based on the slug
  return (
    <div className="min-h-screen bg-cinema-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-cinema-gray border-cinema-gray/20 p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Getting Started with Film</h1>
          <p className="text-gray-400 mb-8">An introduction to the world of cinema</p>

          <div className="prose prose-invert max-w-none">
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ArticleView;