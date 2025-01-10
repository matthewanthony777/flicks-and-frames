import { useState } from 'react';
import { Button } from "@/components/ui/button";
import nosferatuScreenplay from '@/content/resources/nosferatu-screenplay.mdx';
import finalDraftGuide from '@/content/resources/final-draft-guide.mdx';
import screenplayTools from '@/content/resources/screenplay-writing-tools.mdx';
import type { ResourceType, MDXContent } from '@/types/mdx';

const Resources = () => {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const resourceTypes: ResourceType[] = ['book', 'podcast', 'screenplay', 'tool', 'product'];

  // Create an array of MDX modules with their metadata
  const mdxModules = [
    nosferatuScreenplay,
    finalDraftGuide,
    screenplayTools
  ];

  // Filter resources based on selected type
  const filteredResources = selectedType
    ? mdxModules.filter(resource => resource.metadata?.type === selectedType)
    : mdxModules;

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">Resources</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {resourceTypes.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            className="capitalize"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((Resource, index) => (
          <div key={index} className="w-full">
            <Resource />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;