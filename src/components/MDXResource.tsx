import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import MDXVideo from './MDXVideo';
import { Button } from './ui/button';
import { ExternalLink, FileText, Video, Image as ImageIcon } from 'lucide-react';

interface MDXResourceProps {
  title: string;
  description?: string;
  type: 'pdf' | 'video' | 'image' | 'link';
  src: string;
  className?: string;
}

const MDXResource = ({ title, description, type, src, className = "" }: MDXResourceProps) => {
  const renderContent = () => {
    switch (type) {
      case 'video':
        return <MDXVideo src={src} title={title} />;
      case 'image':
        return (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <img src={src} alt={title} className="w-full h-full object-cover" />
          </div>
        );
      case 'pdf':
        return (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(src, '_blank')}
          >
            <FileText className="mr-2 h-4 w-4" />
            View PDF
          </Button>
        );
      case 'link':
        return (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(src, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Resource
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default MDXResource;